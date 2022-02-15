import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Product {

    @Field()
    id: string;

    @Field()
    name: string;

    @Field({nullable: true})
    image: string;

    @Field()
    productGroup: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

    @Field({nullable: true})
    hid: string;

}