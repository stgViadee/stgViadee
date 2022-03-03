import {FieldResolver, Resolver, Root} from 'type-graphql';
import {Message} from '../schemas/Message';
import {Conversation} from '../schemas/Conversation';
import {User} from '../schemas/User';
import {Loader} from 'type-graphql-dataloader';
import {getUsersByIdArray} from '../queries/UserQueries';
import {convertIdsToGlobalId} from '../schemas/relay/GlobalIdHandler';
import DataLoader from 'dataloader';
import {getConversationsByIdArray} from '../queries/FairDeviceQueries';

@Resolver(of => Message)
export class MessageResolver {

    @FieldResolver(is => Conversation, {
        description: "The conversation this message was posted to.",
    })
    @Loader<string, Conversation>(async (ids) => {  // batchLoadFn
        let result = await getConversationsByIdArray(ids);
        return convertIdsToGlobalId('conversation', result);
    })
    async conversation(@Root() message: Message) {
        return (dataloader: DataLoader<string, Conversation>) =>
            dataloader.load(message.conversation);
    }

    @FieldResolver(is => User, {description: "The author of the message."})
    @Loader<string, User>(async (ids) => {  // batchLoadFn
        let result = await getUsersByIdArray(ids);
        return convertIdsToGlobalId('user', result);
    })
    async author(@Root() message: Message) {
        return (dataloader: DataLoader<string, User>) =>
            dataloader.load(message.author);
    }
}
