import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';
import {Organization} from './Organization';

@ObjectType( { implements: Node} )
export class Tag {

    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field(() => Organization)
    organization: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

    @Field({nullable: true})
    hid: string;
}