import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class Preferences {
    @Field()
    id: string;

    @Field({nullable: true})
    hid: string;

    @Field({nullable: true})
    version: number;

    @Field({nullable: true})
    userData: JSON;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

}