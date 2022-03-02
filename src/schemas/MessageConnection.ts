import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {Message} from './Message';

@ObjectType()
export class MessageEdge extends EdgeType("message", Message) {}

@ObjectType()
export class MessageConnection extends ConnectionType<MessageEdge>(
    "message",
    MessageEdge
) {}