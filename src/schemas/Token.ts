import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Token {

    @Field()
    id: string;

    @Field({nullable:true})
    name: string;

    @Field()
    value: string;

    @Field({nullable:true})
    lastUsed: Date;

    @Field()
    user: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

    @Field({nullable:true})
    hid: string;

}