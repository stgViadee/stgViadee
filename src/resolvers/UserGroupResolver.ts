import {Query, Resolver, Arg, Maybe, FieldResolver, Root, Args} from 'type-graphql';
import db, {sql} from '../dbconfig/dbconfig';
import {User} from '../schemas/User';
import {Fair} from '../schemas/Fair';
import {UserGroup} from '../schemas/UserGroup';
import {Organization} from '../schemas/Organization';
import {UserConnection} from '../schemas/UserConnection';
import {ConnectionArgs} from '../schemas/relay/ConnectionArgs';
import {offsetToCursor} from 'graphql-relay';

@Resolver((of) => UserGroup)
export class UserGroupResolver {
    private organizations: Organization[] = [];
    private userGroups: UserGroup[] = [];
    private fairs: Fair[] = [];
    private paginatedResults: User[] = [];

    @Query((returns) => [UserGroup], {nullable: true})
    async getUserGroups(): Promise<UserGroup[]> {
        console.log('UserGroupResolver: getAll');
        this.userGroups = await db.query(sql`
            select id,
                   name,
                   type,
                   organization,
                   added,
                   changed,
                   hid,
                   fair
            from fm."userGroup"
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

        args.validateParameters();

        const countResult = await db.query(sql`
            select count("user".*) as anzahl
            from fm."user"
                     INNER JOIN
                 fm."userGroupMembership" on "user".id = "userGroupMembership"."user"
            WHERE "userGroupMembership"."userGroup" = ${userGroup.id}
        `);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        this.paginatedResults = await db.query(sql`
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
                LIMIT ${bounds.limit}
            OFFSET ${bounds.offset}
        `);

        const edges = this.paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: entity
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);

        return {
            edges,
            pageInfo
        };

    }

}