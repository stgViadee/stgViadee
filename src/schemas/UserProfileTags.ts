import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class UserProfileTags {

    @Field()
    id: string;

    @Field()
    tag: string;

    @Field()
    userProfile: string;

}