import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {Order} from './Order';

@ObjectType()
export class OrderEdge extends EdgeType("order", Order) {}

@ObjectType()
export class OrderConnection extends ConnectionType<OrderEdge>(
    "order",
    OrderEdge,
    Order
) {}