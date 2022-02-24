import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class Printer {
    @Field(() => ID)
    id: string;

    @Field()
    fair: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

    @Field({nullable: true})
    name: string;


    @Field({nullable: true})
    macAddress: string;

    @Field({nullable: true})
    hid: string;


    @Field({nullable: true})
    device: string;

    @Field()
    isDisabled: boolean;
}