import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Booth {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    fair: string;

    @Field({nullable: true})
    hall: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

    @Field({nullable: true})
    hid: string;
}