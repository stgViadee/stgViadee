import {Field, ID, ObjectType} from 'type-graphql';
import {User} from './User';
import {Node} from './Node';
import {OrganizationPreferences} from './OrganizationPreferences';
import {Licensing} from './Licensing';

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

    @Field(() => OrganizationPreferences,{nullable: true})
    preferences: string;

    @Field(() => [Licensing], {nullable:true})
    licenses: [Licensing];

    @Field({nullable: true})
    autoExtendLicense: boolean;

    @Field({nullable: true})
    cancelReason: string;
}