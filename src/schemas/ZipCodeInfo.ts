import {Field, ObjectType} from 'type-graphql';

@ObjectType()
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