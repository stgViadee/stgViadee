import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class OrganizationPreferences {
    @Field()
    id: string;

    @Field({nullable: true})
    hid: string;

    @Field({nullable: true})
    version: number;

    @Field({nullable: true})
    data: JSON;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

}