import * as GraphQL from "type-graphql";
import {ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class SupportInfoCordova {
    @GraphQL.Field(is => String)
    version = "";
}
