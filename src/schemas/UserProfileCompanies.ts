import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class UserProfileCompanies {

    @Field()
    id: string;

    @Field()
    company: string;

    @Field()
    userProfile: string;

}