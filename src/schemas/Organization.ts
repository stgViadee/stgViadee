import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Organization {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field({nullable:true})
    avatar: string;

    @Field({nullable:true})
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