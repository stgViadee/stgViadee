import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class FairResource {
    @Field()
    id: string;

    @Field({nullable:true})
    name: string;

    @Field({nullable:true})
    capacity: number;

    @Field({nullable:true})
    location: string;

    @Field({nullable:true})
    fair: string;

    @Field({nullable:true})
    hasMeetings: boolean;

    @Field({nullable:true})
    hasCatering: boolean;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

    @Field({nullable:true})
    hid: string;
}