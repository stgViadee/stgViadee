import {Query, Resolver, Arg, Maybe, FieldResolver, Root} from 'type-graphql';
import {User} from '../schemas/User';
import {getAllUsers, getUserById, getUsersByIdArray} from '../queries/UserQueries';
import {convertFromGlobalId, convertIdsToGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {Loader} from 'type-graphql-dataloader';
import DataLoader from 'dataloader';

@Resolver((of) => User)
export class UserResolver {
    private users: User[] = []

    @Query((returns) => [User], { nullable: true })
    async getUsers(): Promise<User[]> {
        this.users = await getAllUsers();
        return convertIdsToGlobalId('user', this.users);
    }

    @Query((returns) => User, { nullable: true })
    async user(@Arg("id") userId : string): Promise<Maybe<User>> {
        this.users = await getUserById(convertFromGlobalId(userId).id)
        return convertIdToGlobalId('user', this.users[0]);
    }

    @FieldResolver(is => User, {description: ''})
    @Loader<string, User>(async (ids) => {  // batchLoadFn
        var result = await getUsersByIdArray(ids);
        return convertIdsToGlobalId('user', result);
    })
    async createdBy(@Root() user: User) {
        return (dataloader: DataLoader<string, User>) =>
            dataloader.load(user.createdBy);
    }


}