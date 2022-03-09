import {Query, Resolver, Arg, Maybe, FieldResolver, Root, Args, ID} from 'type-graphql';
import {User} from '../schemas/User';
import {
    getAllUsers,
    getUserByEmailForActor,
    getUserById,
    getUserByIdForActor,
    getUsersByIdArray
} from '../queries/UserQueries';
import {convertFromGlobalId, convertIdsToGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {Loader} from 'type-graphql-dataloader';
import DataLoader from 'dataloader';
import {Preferences} from '../schemas/Preferences';
import {getPreferencesById} from '../queries/PreferencesQueries';
import {Device} from '../schemas/Device';
import {getDeviceByUserId} from '../queries/DeviceQueries';
import {UserProfile} from '../schemas/UserProfile';
import {getUserProfileByUserId} from '../queries/UserProfileQueries';
import {OrganizationConnection} from '../schemas/OrganizationConnection';
import {ConnectionArgs} from '../schemas/relay/ConnectionArgs';
import {getFairProductByFairIdCount, getFairProductByFairIdPaginated} from '../queries/FairProductQueries';
import {offsetToCursor} from 'graphql-relay';
import {generateFilterType} from 'type-graphql-filter';
import {FairDay} from '../schemas/FairDay';
import {FindOrganizationInput} from '../inputs/FindOrganizationInput';
import {
    getOrganizationById,
    getOrganizationByUserIdForActorCount,
    getOrganizationByUserIdForActorPaginated
} from '../queries/OrganizationQueries';

@Resolver((of) => User)
export class UserResolver {

    @Query(returns => User, {
        description: "Returns the currently logged in user.",
    })
    async me(): Promise<Maybe<User>> {
        // TODO hier aus Kontext lesen
        const user = await getUserById('f6265805-0dab-4de0-9297-80ed6e916b44')
        return convertIdToGlobalId('user', user[0]);
    }

    @Query((returns) => [User], { nullable: true })
    async users(): Promise<User[]> {
        const users = await getAllUsers();
        return convertIdsToGlobalId('user', users);
    }

    @Query(returns => User, {
        description: "Finds a user by their email address, or ID.",
        nullable: true,
    })
    async user(
        @Arg("email", is => String, { nullable: true }) email: string,
        @Arg("id", is => ID, { nullable: true }) id: string
    ): Promise<Maybe<User>> {

        const userIdMock = 'f6265805-0dab-4de0-9297-80ed6e916b44';
        const currentUserId = userIdMock;  // TODO userId aus Kontext laden -> hier temp. Mock

        if (!email && !id){
            throw new Error("You have to either specify `email` or `id`.");
        }
        if (email && id){
            throw new Error("You can only specify either `email` or `id`.");
        }

        let user;
        if (email){
            user = await getUserByEmailForActor(email, currentUserId);
            return convertIdToGlobalId('user', user[0]);

        } else {
            user = await getUserByIdForActor(convertFromGlobalId(id).id, currentUserId);
            return convertIdToGlobalId('user', user[0]);
        }

        return null;

    }

    @FieldResolver(is => User, {description: ''})
    @Loader<string, User>(async (ids) => {  // batchLoadFn
        const result = await getUsersByIdArray(ids);
        return convertIdsToGlobalId('user', result);
    })
    async createdBy(@Root() user: User) {
        return (dataloader: DataLoader<string, User>) =>
            dataloader.load(user.createdBy);
    }

    @FieldResolver(is => Preferences, {description: ''})
    async preferences(@Root() user: User): Promise<Preferences> {
        const preferences = await getPreferencesById(user.preferences)
        return convertIdToGlobalId('preferences', preferences[0]);
    }

    @FieldResolver(is => User, {description: ''})
    @Loader<string, User>(async (ids) => {  // batchLoadFn
        const result = await getUsersByIdArray(ids);
        return convertIdsToGlobalId('user', result);
    })
    async invitationSentBy(@Root() user: User) {
        return (dataloader: DataLoader<string, User>) =>
            dataloader.load(user.invitationSentBy);
    }

    @FieldResolver(is => [Device], {
        description: "The fair devices associated with the fair.",
    })
    async devices(
        @Root() user: User
    ): Promise<Device[]> {
        const devices = await getDeviceByUserId(convertFromGlobalId(user.id).id);
        return convertIdsToGlobalId('device', devices);
    }

    @FieldResolver(is => [UserProfile], {
        description: "The profiles of this user.",
    })
    async profiles(
        @Root() user: User
    ): Promise<UserProfile[]> {
        const profiles = await getUserProfileByUserId(convertFromGlobalId(user.id).id);
        return convertIdsToGlobalId(' userProfile', profiles);
    }

    @FieldResolver(is => OrganizationConnection, {
        description: "The organizations this user is a member of.",
    })
    async organizations(
        @Args() args: ConnectionArgs,
        @Root() user: User,
        @Arg('filter')  filter: FindOrganizationInput
    ): Promise<OrganizationConnection> {

        const userIdMock = 'f6265805-0dab-4de0-9297-80ed6e916b44';
        const currentUserId = userIdMock;  // TODO userId aus Kontext laden -> hier temp. Mock

        args.validateArgs();

        const {type, id} = convertFromGlobalId(user.id);

        const countResult = await getOrganizationByUserIdForActorCount(id, filter, currentUserId);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getOrganizationByUserIdForActorPaginated(id, filter, currentUserId, bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('organization', entity)
        }));
        const nodes = edges.map(edge => edge.node);

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo,
            nodes
        };

    }


}