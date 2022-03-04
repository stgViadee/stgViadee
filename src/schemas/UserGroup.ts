import {Field, ObjectType} from 'type-graphql';
import {Organization} from './Organization';
import {Fair} from './Fair';
import {UserConnection} from './UserConnection';
import {Filter} from 'type-graphql-filter';

@ObjectType()
export class UserGroup {

    @Field()
    id: string;

    @Field({nullable:true})
    name: string;

    @Field()
    @Filter(['eq'])
    type: string;

    @Field(() => Organization)
    organization: Organization;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

    @Field(() => Fair, {nullable:true})
    @Filter(['eq'])
    fair: string;

    @Field(() => UserConnection, {nullable : true})
    members: UserConnection;
}