import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Message {
    @Field()
    id: string;

    @Field({nullable: true})
    content: JSON;

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