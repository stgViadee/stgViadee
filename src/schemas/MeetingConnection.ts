import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {Meeting} from './Meeting';

@ObjectType()
export class MeetingEdge extends EdgeType("meeting", Meeting) {}

@ObjectType()
export class MeetingConnection extends ConnectionType<MeetingEdge>(
    "meeting",
    MeetingEdge,
    Meeting
) {}