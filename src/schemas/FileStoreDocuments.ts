import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class FileStoreDocuments {
    @Field()
    id: string;

    @Field()
    fileStore: string;

    @Field()
    document: string;
}