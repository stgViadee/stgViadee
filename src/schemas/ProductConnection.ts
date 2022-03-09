import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {Product} from './Product';

@ObjectType()
export class ProductEdge extends EdgeType("product", Product) {}

@ObjectType()
export class ProductConnection extends ConnectionType<ProductEdge>(
    "product",
    ProductEdge,
    Product
) {}