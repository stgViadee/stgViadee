import {Query, Resolver, Arg, Maybe, FieldResolver, Root, Args} from 'type-graphql';
import db, {sql} from '../dbconfig/dbconfig';
import {User} from '../schemas/User';
import {Fair} from '../schemas/Fair';
import {UserGroup} from '../schemas/UserGroup';
import {Organization} from '../schemas/Organization';
import {UserConnection} from '../schemas/UserConnection';
import {ConnectionArgs} from '../schemas/relay/ConnectionArgs';
import {offsetToCursor} from 'graphql-relay';
import {
    getAllUserGroups,
    getUserGroupMemberByUserGroupIdCount,
    getUserGroupMemberByUserGroupIdPaginated
} from '../queries/UserGroupQueries';
import {getFairById} from '../queries/FairQueries';
import {getOrganizationById} from '../queries/OrganizationQueries';
import {convertFromGlobalId, convertIdsToGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';

@Resolver((of) => UserGroup)
export class UserGroupResolver {
    private organizations: Organization[] = [];
    private userGroups: UserGroup[] = [];
    private fairs: Fair[] = [];
    private paginatedResults: User[] = [];

    @Query((returns) => [UserGroup], {nullable: true})
    async getUserGroups(): Promise<UserGroup[]> {
        this.userGroups = await getAllUserGroups();
        return convertIdsToGlobalId('usergroup', this.userGroups);
    }

    @FieldResolver(is => Fair, {description: ''})
    async fair(@Root() userGroup: UserGroup): Promise<Maybe<Fair>> {
        this.fairs = await getFairById(userGroup.fair);
        return convertIdToGlobalId('fair', this.fairs[0]);
    }

    @FieldResolver(is => Organization, {description: ''})
    async organization(@Root() userGroup: UserGroup): Promise<Organization> {
        this.organizations = await getOrganizationById(userGroup.organization);
        return convertIdToGlobalId('organization', this.organizations[0]);
    }

    @FieldResolver(is => UserConnection, {description: ''})
    async members(@Args() args: ConnectionArgs, @Root() userGroup: UserGroup): Promise<UserConnection> {
        args.validateArgs();
        const countResult = await getUserGroupMemberByUserGroupIdCount(convertFromGlobalId(userGroup.id).id);
        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        this.paginatedResults = await getUserGroupMemberByUserGroupIdPaginated(convertFromGlobalId(userGroup.id).id, bounds);
        const edges = this.paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('userconnection', entity)
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo
        };

    }

}