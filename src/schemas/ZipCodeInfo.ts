import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class ZipCodeInfo {

    @Field()
    id: string;

    @Field()
    countryCode: string;

    @Field()
    zipCode: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;
}