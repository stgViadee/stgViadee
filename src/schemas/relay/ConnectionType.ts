import * as Relay from "graphql-relay";
import {ObjectType, Field, ClassType, Int} from 'type-graphql';
import {PageInfo} from './PageInfo';

type ExtractNodeType<EdgeType> = EdgeType extends Relay.Edge<infer NodeType>
    ? NodeType
    : never;

export function ConnectionType<
    EdgeType extends Relay.Edge<NodeType>,
    NodeType = ExtractNodeType<EdgeType>
    >(nodeName: string, edgeClass: ClassType<EdgeType>, nodeClass: ClassType) {
    @ObjectType(`${nodeName}Connection`, { isAbstract: true })
    abstract class Connection implements Relay.Connection<NodeType> {
        @Field((type) => PageInfo)
        pageInfo: PageInfo;

        @Field((type) => [edgeClass])
        edges: EdgeType[];

        @Field(() => [nodeClass], {
            nullable: true,
            description: "The items on this page.",
        })
        nodes: any[];

        @Field(() => Int, {
            nullable: true,
            description: "Count of all items",
        })
        totalCount: number;

    }


    return Connection;
}