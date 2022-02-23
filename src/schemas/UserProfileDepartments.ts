import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class UserProfileDepartments {

    @Field()
    id: string;

    @Field()
    department: string;

    @Field()
    userProfile: string;

}