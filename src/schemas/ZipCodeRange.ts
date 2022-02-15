import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class ZipCodeRange {

    @Field()
    id: string;

    @Field()
    start: string;

    @Field()
    end: string;

    @Field()
    userProfile: string;
}