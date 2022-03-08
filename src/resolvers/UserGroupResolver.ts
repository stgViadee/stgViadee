import {Query, Resolver, Arg, Maybe, FieldResolver, Root, Args} from 'type-graphql';
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

    @Query((returns) => [UserGroup], {nullable: true})
    async getUserGroups(): Promise<UserGroup[]> {
        const userGroups = await getAllUserGroups();
        return convertIdsToGlobalId('usergroup', userGroups);
    }

    @FieldResolver(is => Fair, {nullable: true, description: ''})
    async fair(@Root() userGroup: UserGroup): Promise<Maybe<Fair>> {
        if (userGroup.fair) {
            const fairs = await getFairById(userGroup.fair);
            return convertIdToGlobalId('fair', fairs[0]);
        }
        return null;
    }

    @FieldResolver(is => Organization, {description: ''})
    async organization(@Root() userGroup: UserGroup): Promise<Organization> {
        const organizations = await getOrganizationById(userGroup.organization);
        return convertIdToGlobalId('organization', organizations[0]);
    }

    @FieldResolver(is => UserConnection, {description: ''})
    async members(@Args() args: ConnectionArgs, @Root() userGroup: UserGroup): Promise<UserConnection> {
        args.validateArgs();
        const countResult = await getUserGroupMemberByUserGroupIdCount(convertFromGlobalId(userGroup.id).id);
        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getUserGroupMemberByUserGroupIdPaginated(convertFromGlobalId(userGroup.id).id, bounds);
        const edges = paginatedResults.map((entity, index) => ({
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