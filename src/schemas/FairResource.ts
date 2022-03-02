import {Field, GraphQLISODateTime, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';
import {Filter} from 'type-graphql-filter';
import {GraphQLBoolean} from 'graphql';
import {Fair} from './Fair';

@ObjectType( { implements: Node} )
export class FairResource {
    @Field(() => ID)
    id: string;

    @Field({nullable:true})
    name: string;

    @Field({nullable:true})
    capacity: number;

    @Field({nullable:true})
    location: string;

    @Field(() => Fair, {nullable:true})
    fair: string;

    @Field({nullable:true})
    @Filter(["eq"], () => GraphQLBoolean)
    hasMeetings: boolean;

    @Field({nullable:true})
    @Filter(["eq"], () => GraphQLBoolean)
    hasCatering: boolean;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

    @Field({nullable:true})
    hid: string;
}