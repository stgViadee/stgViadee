import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {Conversation} from './Conversation';

@ObjectType()
export class ConversationEdge extends EdgeType("conversation", Conversation) {}

@ObjectType()
export class ConversationConnection extends ConnectionType<ConversationEdge>(
    "conversation",
    ConversationEdge,
    Conversation
) {}