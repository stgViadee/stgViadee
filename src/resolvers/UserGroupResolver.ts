import {Query, Resolver, Arg, Maybe, FieldResolver, Root, Args} from 'type-graphql';
import db, {sql} from '../dbconfig/dbconfig';
import {User} from '../schemas/User';
import {Fair} from '../schemas/Fair';
import {UserGroup} from '../schemas/UserGroup';
import {Organization} from '../schemas/Organization';
import {UserConnection} from '../schemas/UserConnection';
import {ConnectionArgs} from '../schemas/relay/ConnectionArgs';
import {getOffsetWithDefault, offsetToCursor} from 'graphql-relay';

@Resolver((of) => UserGroup)
export class UserGroupResolver {
    private organizations: Organization[] = [];
    private userGroups: UserGroup[] = [];
    private fairs: Fair[] = [];
    private users: User[] = [];

    @Query((returns) => [UserGroup], { nullable: true })
    async getUserGroups(): Promise<UserGroup[]> {
        console.log("UserGroupResolver: getAll")
        this.userGroups = await db.query(sql `
            select id,name,type,organization,added,changed,hid,fair from fm."userGroup"
        `);
        return this.userGroups;
    }

    @FieldResolver(is => Fair, {description: ''})
    async fair(@Root() userGroup: UserGroup): Promise<Maybe<Fair>> {
        console.log('UserGroupResolver: lade Fair nach');
        this.fairs = await db.query(sql`
            select id,
                   name,
                   timezone,
                   author,
                   features,
                   organization,
                   added,
                   changed,
                   hid
            from fm.fair
            where id = ${userGroup.fair}
        `);
        return this.fairs[0];
    }

    @FieldResolver(is => Organization, {description: ''})
    async organization(@Root() userGroup: UserGroup): Promise<Organization> {
        console.log('UserGroupResolver: lade organization nach');
        this.organizations = await db.query(sql`
            select id,
                   name,
                   avatar,
                   author,
                   added,
                   changed,
                   hid,
                   credits,
                   preferences,
                   "autoExtendLicense",
                   "cancelReason"
            from fm.organization FROM fm.organization
            where id = ${userGroup.organization}
        `);
        return this.organizations[0];
    }

    @FieldResolver(is => UserConnection, {description: ''})
    async members(@Args() args: ConnectionArgs, @Root() userGroup: UserGroup): Promise<UserConnection> {



        if (args.first && args.last) {
            throw new TypeError('Cannot use \'first\' and \'last\' simultaneously!');
        }
        if (args.before && args.after) {
            throw new TypeError('Cannot use \'before\' and \'after\' simultaneously!');
        }

        const countResult = await db.query(sql`
            select "user".*
            from fm."user" INNER JOIN
                 fm."userGroupMembership" on "user".id = "userGroupMembership"."user"
            WHERE "userGroupMembership"."userGroup" = ${userGroup.id}
        `);

        const totalCount  =  countResult.length;

        console.log(userGroup.id + " Es gibt " + totalCount + " User in der Gruppe");

        // offsets
        const beforeOffset = getOffsetWithDefault(args.before, totalCount);
        const afterOffset = getOffsetWithDefault(args.after, -1);

        let startOffset = Math.max(-1, afterOffset) + 1;
        let endOffset = Math.min(beforeOffset, totalCount);

        if (args.first) {
            endOffset = Math.min(endOffset, startOffset + args.first);
        }

        if (args.last) {
            startOffset = Math.max(startOffset, endOffset - args.last);
        }

        // skip, take
        const offset = Math.max(startOffset, 0); // sql offset
        const limit = Math.max(endOffset - startOffset, 1); // sql limit


        console.log(offset);
        console.log(endOffset);
        console.log(startOffset);
        console.log(limit);

        this.users = await db.query(sql`
            select "user".id,
                   email,
                   password,
                   "hasActiveConnection",
                   "lastAuthenticated",
                   "createdBy",
                   "invitationSent",
                   "invitationSentBy",
                   "isDisabled",
                   added,
                   changed,
                   "usesAuthEmailProxy",
                   hid,
                   preferences,
                   "emailValidated",
                   "hasMobileDevices"
            from fm."user"
                     INNER JOIN fm."userGroupMembership" on "user".id = "userGroupMembership"."user"
            WHERE "userGroupMembership"."userGroup" = ${userGroup.id}
            order by "user".id asc 
            LIMIT ${limit} OFFSET ${offset}
        `);

        const edges = this.users.map((entity, index) => ({
            cursor: offsetToCursor(startOffset + index),
            node: entity
        }));

        // page info
        const { length, 0: firstEdge, [length - 1]: lastEdge } = edges
        const lowerBound = args.after ? afterOffset + 1 : 0
        const upperBound = args.before ? Math.min(beforeOffset, totalCount) : totalCount

        const pageInfo = {
            startCursor: firstEdge ? firstEdge.cursor : null,
            endCursor: lastEdge ? lastEdge.cursor : null,
            hasPreviousPage: args.last ? startOffset > lowerBound : false,
            hasNextPage: args.first ? endOffset < upperBound : false
        }

        return {
            edges,
            pageInfo
        }

    }

}