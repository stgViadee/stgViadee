import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';
import {Filter} from 'type-graphql-filter';
import {GraphQLBoolean, GraphQLString} from 'graphql';

@ObjectType( { implements: Node} )
export class FairInfo {
    @Field(() => ID)
    id: string;

    @Field({nullable:true})
    @Filter(["eq"], () => GraphQLString)
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