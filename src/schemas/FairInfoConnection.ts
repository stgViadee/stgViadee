import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {FairInfo} from './FairInfo';

@ObjectType()
export class FairInfoEdge extends EdgeType("fairInfo", FairInfo) {}

@ObjectType()
export class FairInfoConnection extends ConnectionType<FairInfoEdge>(
    "fairInfo",
    FairInfoEdge,
    FairInfo
) {}