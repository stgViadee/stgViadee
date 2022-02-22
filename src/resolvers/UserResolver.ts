import {Query, Resolver, Arg, Maybe, FieldResolver, Root} from 'type-graphql';
import {User} from '../schemas/User';
import {getAllUsers, getUserById, getUsersByIdArray} from '../queries/UserQueries';

@Resolver((of) => User)
export class UserResolver {
    private users: User[] = []

    @Query((returns) => [User], { nullable: true })
    async getUsers(): Promise<User[]> {
        this.users = await getAllUsers();
        return this.users;
    }

    @Query((returns) => User, { nullable: true })
    async user(@Arg("id") id : string): Promise<Maybe<User>> {
        this.users = await getUserById(id)
        return this.users[0];
    }

    @FieldResolver(is => User, {description: ''})
    async createdBy(@Root() user: User): Promise<User> {
        this.users = await getUserById(user.createdBy)
        return this.users[0];
    }


}