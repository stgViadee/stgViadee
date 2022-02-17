import * as GraphQL from "type-graphql";
import {ObjectType} from 'type-graphql';

@ObjectType()
export class SupportInfoCordova {
    @GraphQL.Field(is => String)
    version = "";
}
