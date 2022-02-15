import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class UserProfileZipCodeInfos {

    @Field()
    id: string;

    @Field()
    zipCodeInfo: string;

    @Field()
    userProfile: string;

}