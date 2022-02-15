import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Conversation{
    @Field()
    id: string

    @Field({nullable:true})
    added: Date

    @Field({nullable:true})
    changed: Date

    @Field({nullable:true})
    user: string

    @Field({nullable:true})
    hid: string

    @Field({nullable:true})
    recipient: string

}