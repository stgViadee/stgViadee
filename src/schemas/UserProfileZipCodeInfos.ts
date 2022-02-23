import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class UserProfileZipCodeInfos {

    @Field()
    id: string;

    @Field()
    zipCodeInfo: string;

    @Field()
    userProfile: string;

}