import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class UserProfileLanguages {

    @Field()
    id: string;

    @Field()
    language: string;

    @Field()
    userProfile: string;

}