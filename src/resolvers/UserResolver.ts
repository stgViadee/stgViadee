import {Query, Resolver, Arg, Maybe, FieldResolver, Root, Args} from 'type-graphql';
import {User} from '../schemas/User';
import {getAllUsers, getUserById, getUsersByIdArray} from '../queries/UserQueries';
import {convertFromGlobalId, convertIdsToGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {Loader} from 'type-graphql-dataloader';
import DataLoader from 'dataloader';
import {Preferences} from '../schemas/Preferences';
import {getPreferencesById} from '../queries/PreferencesQueries';
import {Device} from '../schemas/Device';
import {getDeviceByUserId} from '../queries/DeviceQueries';
import {UserProfile} from '../schemas/UserProfile';
import {getUserProfileByUserId} from '../queries/UserProfileQueries';

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
    async user(): Promise<User[]> {
        const users = await getAllUsers();
        return convertIdsToGlobalId('user', users);
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


}