import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Order {
    @Field()
    id: string;

    @Field()
    fair: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

    @Field({nullable: true})
    positions: JSON;

    @Field({nullable: true})
    currency: string;

    @Field({nullable: true})
    destination: string;

    @Field({nullable: true})
    author: string;

    @Field({nullable: true})
    recipient: string;

    @Field({nullable: true})
    hid: string;
}