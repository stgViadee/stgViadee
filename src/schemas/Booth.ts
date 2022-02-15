import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Booth {
    @Field()
    id: number

    @Field()
    name: string

    @Field( {nullable:true})
    hall: string

    @Field()
    added: Date

    @Field()
    changed: Date

    @Field()
    hid: string
}