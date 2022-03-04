import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';
import {OrganizationPreferencesData} from './OrganizationPreferencesData';

@ObjectType( { implements: Node} )
export class OrganizationPreferences {
    @Field(() => ID)
    id: string;

    @Field({nullable: true})
    hid: string;

    @Field({nullable: true})
    version: number;

    @Field(() => OrganizationPreferencesData, {nullable: true})
    data: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

}