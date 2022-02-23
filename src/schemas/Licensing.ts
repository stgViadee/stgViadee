import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class Licensing {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field({nullable:true})
    terms: JSON;

    @Field({nullable:true})
    validFrom: Date;

    @Field({nullable:true})
    validUntil: Date;

    @Field()
    organization: string;

    @Field({nullable:true})
    hid: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;
}