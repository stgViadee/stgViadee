import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Department {
    @Field()
    id: string;

    @Field( {nullable:true})
    name: string;

    @Field({nullable: true})
    subscriptions: JSON;

    @Field({nullable: true})
    support: JSON;

    @Field({nullable: true})
    hasActiveConnection: boolean;

    @Field()
    type: string;

    @Field({nullable:true})
    deviceIdentifier: string;

    @Field({nullable:true})
    pushIdentifier: string;

    @Field()
    user: string;

    @Field()
    token: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

    @Field({nullable:true})
    hid: string;

    @Field({nullable:true})
    lastAuthenticated: Date;

    @Field({nullable:true})
    deliveryFailures: number;


}