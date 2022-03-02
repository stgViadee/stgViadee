import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class Product {

    @Field(() => ID)
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