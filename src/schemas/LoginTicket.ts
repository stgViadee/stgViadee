import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class LoginTicket {
    @Field()
    id: string;

    @Field({nullable: true})
    user: string;

    @Field({nullable: true})
    validated: Date;

    @Field()
    value: string;

    @Field({nullable:true})
    expires: Date;

    @Field()
    deviceIdentifier: string;

    @Field({nullable: true})
    hid: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;
}