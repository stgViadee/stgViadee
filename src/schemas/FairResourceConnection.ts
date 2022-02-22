import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {FairResource} from './FairResource';

@ObjectType()
export class FairResourceEdge extends EdgeType("fairResource", FairResource) {}

@ObjectType()
export class FairResourceConnection extends ConnectionType<FairResourceEdge>(
    "fairResource",
    FairResourceEdge
) {}