import {Field, ID, ObjectType} from 'type-graphql';
import {User} from './User';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class Organization {

    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field({nullable:true})
    avatar: string;

    @Field(() => User)
    author: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

    @Field({nullable: true})
    hid: string;

    @Field({nullable: true})
    credits: number;

    @Field({nullable: true})
    preferences: string;

    @Field({nullable: true})
    autoExtendLicense: boolean;

    @Field({nullable: true})
    cancelReason: string;
}