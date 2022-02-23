import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class FairInfo {
    @Field()
    id: string;

    @Field({nullable:true})
    type: string;

    @Field({nullable:true})
    fair: string;

    @Field({nullable:true})
    content: string;

    @Field({nullable:true})
    label: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

    @Field({nullable:true})
    hid: string;
}