import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class UserProfileCompanies {

    @Field()
    id: string;

    @Field()
    company: string;

    @Field()
    userProfile: string;

}