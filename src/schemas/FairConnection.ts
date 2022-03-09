import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {Fair} from './Fair';

@ObjectType()
export class FairEdge extends EdgeType("fair", Fair) {}

@ObjectType()
export class FairConnection extends ConnectionType<FairEdge>(
    "fair",
    FairEdge,
    Fair
) {}