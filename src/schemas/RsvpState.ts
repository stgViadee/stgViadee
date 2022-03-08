import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';
import {Meeting} from './Meeting';
import {User} from './User';

@ObjectType( { implements: Node} )
export class RsvpState {

    @Field(() => ID)
    id: string;

    @Field({nullable: true})
    reply: string;

    @Field(() => Meeting, {nullable: true})
    meeting: string;

    @Field(() => User, {nullable: true})
    user: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

    @Field({nullable: true})
    hid: string;

}