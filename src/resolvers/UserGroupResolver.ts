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
        this.userGroups = await db.query(sql`
            select * from fm."userGroup"
        `);
        return this.userGroups;
    }

    @FieldResolver(is => Fair, {description: ''})
    async fair(@Root() userGroup: UserGroup): Promise<Maybe<Fair>> {
        this.fairs = await db.query(sql`
            select * from fm.fair
            where id = ${userGroup.fair}
        `);
        return this.fairs[0];
    }

    @FieldResolver(is => Organization, {description: ''})
    async organization(@Root() userGroup: UserGroup): Promise<Organization> {
        this.organizations = await db.query(sql`
            select * from fm.organization FROM fm.organization
            where id = ${userGroup.organization}
        `);
        return this.organizations[0];
    }

    @FieldResolver(is => UserConnection, {description: ''})
    async members(@Args() args: ConnectionArgs, @Root() userGroup: UserGroup): Promise<UserConnection> {

        args.validateArgs();

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
            select user.*
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