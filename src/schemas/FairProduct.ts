import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class FairProduct {
    @Field()
    id: string;

    @Field({nullable:true})
    price: number;

    @Field({nullable:true})
    needsCustomerInput: boolean;

    @Field({nullable:true})
    isEmpty: boolean;

    @Field({nullable:true})
    size: string;

    @Field({nullable:true})
    fair: string;

    @Field({nullable:true})
    product: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

    @Field({nullable:true})
    hid: string;
}