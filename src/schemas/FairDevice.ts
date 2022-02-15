import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class FairDevice {
    @Field()
    id: string;

    @Field({nullable:true})
    name: string;

    @Field({nullable:true})
    fair: string;

    @Field()
    device: string;

    @Field({nullable:true})
    settings: JSON;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

    @Field({nullable:true})
    hid: string;
}