import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class FairProductAvailability {
    @Field(() => ID)
    id: string;

    @Field({nullable:true})
    availableFrom: Date;

    @Field({nullable:true})
    availableUntil: Date;

    @Field({nullable:true})
    fairProduct: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

    @Field({nullable:true})
    hid: string;
}