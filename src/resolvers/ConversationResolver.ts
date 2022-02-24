import {FieldResolver, Resolver, Root} from 'type-graphql';
import {Conversation} from '../schemas/Conversation';
import {User} from '../schemas/User';
import {getUserById} from '../queries/UserQueries';
import {convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';

@Resolver((of) => Conversation)
export class ConversationResolver {
    private users: User[] = []

    @FieldResolver(is => User, {description: ''})
    async user(@Root() conversation: Conversation): Promise<User> {
        this.users = await getUserById(conversation.user);
        return convertIdToGlobalId('user', this.user[0]);
    }

    @FieldResolver(is => User, {description: ''})
    async recipient(@Root() conversation: Conversation): Promise<User> {
        this.users = await getUserById(conversation.recipient);
        return convertIdToGlobalId('user', this.user[0]);
    }

}