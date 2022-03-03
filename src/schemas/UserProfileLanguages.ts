import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';
import {Language} from './Language';

@ObjectType( { implements: Node} )
export class UserProfileLanguages {

    @Field(() => ID)
    id: string;

    @Field(() => Language)
    language: string;

    @Field()
    userProfile: string;

}