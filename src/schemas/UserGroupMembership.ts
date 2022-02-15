import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class UserGroupMembership {

    @Field()
    id: string;

    @Field()
    user: string;

    @Field()
    userGroup: string;
}