import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Document {
    @Field()
    id: string;

    @Field({nullable:true})
    hid: string;

    @Field()
    type: string;

    @Field()
    contentType: string;

    @Field()
    bucket: string;

    @Field()
    path: string;

    @Field()
    key: string;

    @Field()
    added: Date;

    @Field()
    changed: Date;

}