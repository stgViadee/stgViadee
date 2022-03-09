import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {Credit} from './Credit';

@ObjectType()
export class CreditEdge extends EdgeType("credit", Credit) {}

@ObjectType()
export class CreditConnection extends ConnectionType<CreditEdge>(
    "credit",
    CreditEdge,
    Credit
) {}