import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class RsvpState {

    @Field()
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