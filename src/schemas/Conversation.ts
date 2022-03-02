import {Field, ID, ObjectType} from 'type-graphql';
import {User} from './User';
import {Message} from './Message';
import {Node} from './Node';
import {GraphQLString} from 'graphql';
import {Filter} from 'type-graphql-filter';
import {Fair} from './Fair';

@ObjectType( { implements: Node} )
export class Conversation{
    @Field(() => ID)
    @Filter(['eq'], () => GraphQLString)
    id: string

    @Field({nullable:true})
    added: Date

    @Field({nullable:true})
    changed: Date

    @Field(() => User, {nullable:true})
    @Filter(['eq'], () => GraphQLString)
    user: string

    @Field({nullable:true})
    hid: string

    @Field(() => User, {nullable:true})
    @Filter(['eq'], () => GraphQLString)
    recipient: string

    @Filter(['eq'], () => GraphQLString)
    fair: string

    @Filter(['eq'], () => GraphQLString)
    organizazion: string

}