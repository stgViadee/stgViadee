import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';
import {Fair} from './Fair';
import {Filter} from 'type-graphql-filter';
import {Device} from './Device';

@ObjectType( { implements: Node} )
export class Printer {
    @Field(() => ID)
    id: string;

    @Field(() => Fair)
    @Filter(['eq'])
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


    @Field(() => Device, {nullable: true})
    device: string;

    @Field()
    isDisabled: boolean;
}