import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class Timeframe {

    @Field()
    id: string;

    @Field()
    start: Date;

    @Field()
    end: Date;

    @Field({nullable: true})
    staffMember: string;
}