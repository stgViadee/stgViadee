import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class UserProfileLanguages {

    @Field()
    id: string;

    @Field()
    language: string;

    @Field()
    userProfile: string;

}