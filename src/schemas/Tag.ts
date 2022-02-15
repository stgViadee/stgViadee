import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Tag {

    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    organization: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

    @Field({nullable: true})
    hid: string;
}