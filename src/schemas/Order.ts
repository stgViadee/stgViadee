import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';
import {SerializedOrderPosition} from './SerializedOrderPosition';
import {Fair} from './Fair';

@ObjectType( { implements: Node} )
export class Order {
    @Field(() => ID)
    id: string;

    @Field(() => Fair)
    fair: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

    @Field(() => [SerializedOrderPosition], {nullable: true})
    positions: [SerializedOrderPosition];

    @Field({nullable: true})
    currency: string;

    @Field({nullable: true})
    destination: string;

    @Field({nullable: true})
    author: string;

    @Field({nullable: true})
    recipient: string;

    @Field({nullable: true})
    hid: string;
}