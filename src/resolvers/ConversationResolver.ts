import {Arg, Args, FieldResolver, Query, Resolver, Root} from 'type-graphql';
import {Conversation} from '../schemas/Conversation';
import {User} from '../schemas/User';
import {getUserById} from '../queries/UserQueries';
import {convertFromGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {ConversationConnection} from '../schemas/ConversationConnection';
import {ConnectionArgs} from '../schemas/relay/ConnectionArgs';
import {offsetToCursor} from 'graphql-relay';
import {generateFilterType} from 'type-graphql-filter';
import {getConversationsByUserIdFiltered, getConversationsByUserIdFilteredCount} from '../queries/ConversationQueries';
import {MessageConnection} from '../schemas/MessageConnection';
import {getMessageByConversationId, getMessageByConversationIdCount} from '../queries/MessageQueries';

@Resolver((of) => Conversation)
export class ConversationResolver {

    @Query(returns => ConversationConnection, {
        description: 'Returns conversations you are paricipating in. If you are filtering by fair or organization, the user partaking in the  conversation needs to be a member of the given fair or organization.',
    })
    async conversations(
        @Args() args: ConnectionArgs,
        @Arg('filter', generateFilterType(Conversation), {nullable:true}) filter: any
    ): Promise<ConversationConnection> {
        args.validateArgs();

        const userIdMock = 'f6265805-0dab-4de0-9297-80ed6e916b44';
        const userId = userIdMock;  // TODO userId aus Kontext laden -> hier temp. Mock
        var fairId;
        var organizationId;
        if (filter && filter.fair_eq) {
            fairId = convertFromGlobalId(filter.fair_eq).id;
        }
        if (filter && filter.organization_eq){
            organizationId  = convertFromGlobalId(filter.organization_eq).id;
        }

        const countResult = await getConversationsByUserIdFilteredCount(userId, fairId, organizationId);


        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getConversationsByUserIdFiltered(userId, fairId, organizationId, bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('conversation', entity)
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo
        };

    }

    @FieldResolver(is => User, {description: ''})
    async user(@Root() conversation: Conversation): Promise<User> {
        const users = await getUserById(conversation.user);
        return convertIdToGlobalId('user', users[0]);
    }

    @FieldResolver(is => User, {description: ''})
    async recipient(@Root() conversation: Conversation): Promise<User> {
        const users = await getUserById(conversation.recipient);
        return convertIdToGlobalId('user', users[0]);
    }

    @FieldResolver(is => MessageConnection, {
        description: "The messages that have been posted to the conversation.",
    })
    async messages(
        @Args() args: ConnectionArgs,
        @Root() conversation: Conversation
    ): Promise<MessageConnection> {

        args.validateArgs();

        const {type, id} = convertFromGlobalId(conversation.id);
        const countResult = await getMessageByConversationIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getMessageByConversationId(id,  bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('message', entity)
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo
        };

    }

}