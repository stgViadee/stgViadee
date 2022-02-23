import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class Policy {
    @Field()
    id: string;

    @Field({nullable: true})
    version: string;

    @Field()
    data: JSON;

    @Field({nullable: true})
    session: string;

}