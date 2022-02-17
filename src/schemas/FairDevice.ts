import {Field, ID, ObjectType} from 'type-graphql';
import {Fair} from './Fair';
import {Device} from './Device';

@ObjectType()
export class FairDevice {
    @Field(() => ID)
    id: string;

    @Field({nullable:true})
    name: string;

    @Field(() => Fair)
    fair: Fair;

    @Field(() => Device)
    device: Device;

    @Field({nullable:true})
    settings: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

    @Field({nullable:true})
    hid: string;
}