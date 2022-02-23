import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class UserProfileTags {

    @Field()
    id: string;

    @Field()
    tag: string;

    @Field()
    userProfile: string;

}