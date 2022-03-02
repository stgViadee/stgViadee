import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';
import {MessageContent} from './MessageContent';

@ObjectType( { implements: Node} )
export class Message {
    @Field(() => ID)
    id: string;

    @Field({nullable: true})
    content: MessageContent;

    @Field({nullable: true})
    conversation: string;

    @Field({nullable: true})
    author: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

    @Field({nullable: true})
    hid: string;

    @Field({nullable: true})
    wasDelivered: boolean;

    @Field({nullable: true})
    wasRead: boolean;

    @Field({nullable: true})
    wasDeleted: boolean;

}