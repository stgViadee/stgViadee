import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class FileStoreDocuments {
    @Field()
    id: string;

    @Field()
    fileStore: string;

    @Field()
    document: string;
}