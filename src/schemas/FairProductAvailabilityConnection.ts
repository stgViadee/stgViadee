import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {FairProductAvailability} from './FairProductAvailability';

@ObjectType()
export class FairProductAvailabilityEdge extends EdgeType("fairProductAvailability", FairProductAvailability) {}

@ObjectType()
export class FairProductAvailabilityConnection extends ConnectionType<FairProductAvailabilityEdge>(
    "fairProductAvailability",
    FairProductAvailabilityEdge,
    FairProductAvailability
) {}