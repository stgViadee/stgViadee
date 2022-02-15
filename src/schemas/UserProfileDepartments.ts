import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class UserProfileDepartments {

    @Field()
    id: string;

    @Field()
    department: string;

    @Field()
    userProfile: string;

}