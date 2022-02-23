import {Field, ID, ObjectType} from 'type-graphql';
import {SupportArchive} from './SupportArchive';
import {DeviceSubscriptions} from './DeviceSubscription';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class Device {
    @Field(() => ID)
    id: string;

    @Field( {nullable:true})
    name: string;

    @Field(() => DeviceSubscriptions, { nullable: true})
    subscriptions: DeviceSubscriptions;

    @Field(() => SupportArchive, {nullable:true})
    support: SupportArchive;

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