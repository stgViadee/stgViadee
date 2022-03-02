import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';
import {Fair} from './Fair';
import {Product} from './Product';

@ObjectType( { implements: Node} )
export class FairProduct {
    @Field(() => ID)
    id: string;

    @Field({nullable:true})
    price: number;

    @Field({nullable:true})
    needsCustomerInput: boolean;

    @Field({nullable:true})
    isEmpty: boolean;

    @Field({nullable:true})
    size: string;

    @Field(() => Fair, {nullable:true})
    fair: string;

    @Field(() => Product, {nullable:true})
    product: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

    @Field({nullable:true})
    hid: string;
}