import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class Session {

    @Field()
    id: string;

    @Field()
    user: string;

    @Field({nullable: true})
    device: string;

    @Field({nullable: true})
    address: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

    @Field({nullable: true})
    lastAuthenticated: Date;

}