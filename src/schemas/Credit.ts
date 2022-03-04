import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class Credit {
    @Field(() => ID)
    id: string;

    @Field({nullable: true})
    hid: string;

    @Field()
    organization: string;

    @Field({nullable: true})
    balanceChange: number;

    @Field({nullable: true})
    meta: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;
}