import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Fair {
    @Field()
    id: string;

    @Field({nullable:true})
    hid: string;

    @Field({nullable:true})
    name: string;

    @Field({nullable:true})
    timezone: string;

    @Field()
    author: string;

    @Field({nullable:true})
    feature: JSON;

    @Field()
    organization: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

}