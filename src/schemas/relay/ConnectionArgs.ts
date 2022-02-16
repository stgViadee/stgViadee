import * as Relay from "graphql-relay";
import { Field, ArgsType } from "type-graphql";

@ArgsType()
export class ConnectionArgs implements Relay.ConnectionArguments {
    @Field((type) => String, {
        nullable: true,
        description: "Paginate before opaque cursor",
    })
    before?: Relay.ConnectionCursor;

    @Field((type) => String, {
        nullable: true,
        description: "Paginate after opaque cursor",
    })
    after?: Relay.ConnectionCursor;

    @Field((type) => Number, { nullable: true, description: "Paginate first" })
    first?: number;

    @Field((type) => Number, { nullable: true, description: "Paginate last" })
    last?: number;

}