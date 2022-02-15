import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class FileStoreImages {
    @Field()
    id: string;

    @Field()
    fileStore: string;

    @Field()
    image: string;
}