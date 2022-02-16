import { Field, ObjectType } from 'type-graphql'
import {User} from './User';
import {Message} from './Message';

@ObjectType()
export class Conversation{
    @Field()
    id: string

    @Field({nullable:true})
    added: Date

    @Field({nullable:true})
    changed: Date

    @Field(() => User, {nullable:true})
    user: string

    @Field({nullable:true})
    hid: string

    @Field(() => User, {nullable:true})
    recipient: string

    @Field(() => Message, {nullable:true})
    messages: [Message]

}