import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class UserGroupMembership {

    @Field()
    id: string;

    @Field()
    user: string;

    @Field()
    userGroup: string;
}