import {Field, ObjectType} from 'type-graphql';
import * as Relay from 'graphql-relay';


@ObjectType()
export class PageInfo {
    @Field((type) => Boolean)
    hasNextPage: boolean;

    @Field((type) => Boolean)
    hasPreviousPage: boolean;

    @Field((type) => String, {nullable: true})
    startCursor: Relay.ConnectionCursor;

    @Field((type) => String, {nullable: true})
    endCursor: Relay.ConnectionCursor;
}


