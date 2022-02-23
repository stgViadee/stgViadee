import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class CoveredRooms {
    @Field()
    id: string;

    @Field()
    printer: string;

    @Field()
    fairResource: string;

}