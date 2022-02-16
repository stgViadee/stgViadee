import {Field, ObjectType} from 'type-graphql';
import { ID } from '../../node_modules/type-graphql/dist/index';

@ObjectType()
export class User {

    @Field(() => ID)
    id: string;

    @Field({nullable: true})
    email: string;

    @Field({nullable: true})
    password: string;

    @Field()
    hasActiveConnection: boolean;

    @Field({nullable: true})
    lastAuthenticated: Date;

    @Field(() => User, {nullable: true})
    createdBy: User;

    @Field({nullable: true})
    invitationSent: Date;

    @Field({nullable: true})
    invitationSentBy: string;

    @Field({nullable: true})
    isDisabled: boolean;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

    @Field({nullable: true})
    usesAuthEmailProxy: boolean;

    @Field({nullable: true})
    hid: string;

    @Field({nullable: true})
    preferences: string;

    @Field({nullable: true})
    emailValidated: boolean;

    @Field({nullable: true})
    hasMobileDevices: boolean;

}