import {Field, ID, InterfaceType} from 'type-graphql';
import {convertFromGlobalId} from './relay/GlobalIdHandler';
import {mapType} from './TypeMapper';

@InterfaceType("Node", {
    autoRegisterImplementations: false,
    resolveType: value => {
        return mapType(convertFromGlobalId(value.id).type);
    }
})
export abstract class Node {
    @Field(() => ID, {
        name: 'id',
        description: 'The global ID of the object.'
    })
    readonly globalId!: string;
}