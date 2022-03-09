import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {Booth} from './Booth';
import {Node} from './Node';

@ObjectType(  )
export class BoothEdge extends EdgeType("booth", Booth) {}

@ObjectType()
export class BoothConnection extends ConnectionType<BoothEdge>(
    "booth",
    BoothEdge,
    Booth
) {}