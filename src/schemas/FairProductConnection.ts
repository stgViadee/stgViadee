import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {FairProduct} from './FairProduct';

@ObjectType()
export class FairProductEdge extends EdgeType("fairProduct", FairProduct) {}

@ObjectType()
export class FairProductConnection extends ConnectionType<FairProductEdge>(
    "fairProduct",
    FairProductEdge,
    FairProduct
) {}