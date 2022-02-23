import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class FileStoreImages {
    @Field()
    id: string;

    @Field()
    fileStore: string;

    @Field()
    image: string;
}