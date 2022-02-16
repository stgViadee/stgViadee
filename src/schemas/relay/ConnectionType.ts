import * as Relay from "graphql-relay";
import { ObjectType, Field, ClassType } from "type-graphql";
import {PageInfo} from './PageInfo';

type ExtractNodeType<EdgeType> = EdgeType extends Relay.Edge<infer NodeType>
    ? NodeType
    : never;

export function ConnectionType<
    EdgeType extends Relay.Edge<NodeType>,
    NodeType = ExtractNodeType<EdgeType>
    >(nodeName: string, edgeClass: ClassType<EdgeType>) {
    @ObjectType(`${nodeName}Connection`, { isAbstract: true })
    abstract class Connection implements Relay.Connection<NodeType> {
        @Field((type) => PageInfo)
        pageInfo: PageInfo;

        @Field((type) => [edgeClass])
        edges: EdgeType[];
    }

    return Connection;
}