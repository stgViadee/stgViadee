import {Field, ID, InterfaceType} from 'type-graphql';

@InterfaceType("Node", {
    autoRegisterImplementations: false,
    resolveType: rootObject => rootObject.constructor.name,
})
export abstract class NodeInterface {
    @Field(is => ID, { name: "id", description: "The global ID of this node." })
    id!: string;
}
