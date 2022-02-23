import {Field, ID, ObjectType} from 'type-graphql';
import {Organization} from './Organization';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class Department {
    @Field(() => ID)
    id: string;

    @Field({nullable: true})
    hid: string;

    @Field()
    name: string;

    @Field(() => Organization)
    organization: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;
}