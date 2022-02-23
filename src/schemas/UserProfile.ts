import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class UserProfile {

    @Field()
    id: string;

    @Field({nullable:true})
    salutation: string;

    @Field({nullable:true})
    nameFirst: string;

    @Field({nullable:true})
    nameLast: string;

    @Field({nullable:true})
    phone: string;

    @Field({nullable:true})
    country: string;

    @Field({nullable:true})
    avatar: string;

    @Field({nullable:true})
    costUnit: string;

    @Field()
    organization: string;

    @Field()
    user: string;

    @Field({nullable:true})
    invitationSent: Date;

    @Field({nullable:true})
    invitationSentBy: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

    @Field({nullable:true})
    hid: string;

    @Field({nullable:true})
    notes: string;

}