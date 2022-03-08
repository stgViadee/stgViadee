import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';
import {ProductGroup} from './ProductGroup';

@ObjectType( { implements: Node} )
export class Product {

    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field({nullable: true})
    image: string;

    @Field(() => ProductGroup)
    productGroup: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

    @Field({nullable: true})
    hid: string;

}