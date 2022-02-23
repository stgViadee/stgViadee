import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class ZipCodeRange {

    @Field()
    id: string;

    @Field()
    start: string;

    @Field()
    end: string;

    @Field()
    userProfile: string;
}