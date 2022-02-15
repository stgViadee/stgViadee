import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Department {
    @Field()
    id: string;

    @Field({nullable: true})
    hid: string;

    @Field()
    name: string;

    @Field()
    organization: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;
}