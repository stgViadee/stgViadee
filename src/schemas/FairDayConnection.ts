import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {FairDay} from './FairDay';

@ObjectType()
export class FairDayEdge extends EdgeType("fairDay", FairDay) {}

@ObjectType()
export class FairDayConnection extends ConnectionType<FairDayEdge>(
    "fairDay",
    FairDayEdge
) {}