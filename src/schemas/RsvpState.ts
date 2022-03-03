import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class RsvpState {

    @Field(() => ID)
    id: string;

    @Field({nullable: true})
    reply: string;

    @Field({nullable: true})
    meeting: string;

    @Field({nullable: true})
    user: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

    @Field({nullable: true})
    hid: string;

}