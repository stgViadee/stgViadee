import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';
import {PreferencesData} from './PreferencesData';

@ObjectType( { implements: Node} )
export class Preferences {
    @Field()
    id: string;

    @Field({nullable: true})
    hid: string;

    @Field({nullable: true})
    version: number;

    @Field(() => PreferencesData, {nullable: true})
    userData: PreferencesData;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

}