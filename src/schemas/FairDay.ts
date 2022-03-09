import {Field, GraphQLISODateTime, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class FairDay {
    @Field(() => ID)
    id: string;

    @Field()
    open: Date;

    @Field()
    close: Date;

    @Field({nullable:true})
    fair: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

    @Field({nullable:true})
    hid: string;

}