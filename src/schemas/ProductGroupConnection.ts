import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {ProductGroup} from './ProductGroup';

@ObjectType()
export class ProductGroupEdge extends EdgeType("productGroup", ProductGroup) {}

@ObjectType()
export class ProductGroupConnection extends ConnectionType<ProductGroupEdge>(
    "productGroup",
    ProductGroupEdge,
    ProductGroup
) {}