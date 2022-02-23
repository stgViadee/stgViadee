import {Field, GraphQLISODateTime, ID, ObjectType} from 'type-graphql';
import {Filter} from 'type-graphql-filter';
import {GraphQLString} from 'graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class FairDay {
    @Field(() => ID)
    id: string;

    @Field()
    @Filter(["lte"], () => GraphQLISODateTime)
    open: Date;

    @Field()
    @Filter(["gte"], () => GraphQLISODateTime)
    close: Date;

    @Field({nullable:true})
    @Filter(["eq"], () => GraphQLString)
    fair: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

    @Field({nullable:true})
    hid: string;

}