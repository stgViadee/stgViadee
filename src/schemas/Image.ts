import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Image {
    @Field()
    id: string;

    @Field({nullable:true})
    hid: string;

    @Field()
    type: string;

    @Field({nullable:true})
    contentType: string;

    @Field({nullable:true})
    meta: JSON;

    @Field({nullable:true})
    url: string;

    @Field({nullable:true})
    user: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    change: Date;

    @Field({nullable:true})
    width: number;

    @Field({nullable:true})
    height: number;

    @Field({nullable:true})
    fairDevice: string;

    @Field({nullable:true})
    fair: string;

}