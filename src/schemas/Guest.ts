import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class Guest {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field({nullable: true})
    meeting: string;
}