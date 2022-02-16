import {Field, ObjectType} from 'type-graphql';
import {Organization} from './Organization';
import {Fair} from './Fair';
import {UserConnection} from './UserConnection';

@ObjectType()
export class UserGroup {

    @Field()
    id: string;

    @Field({nullable:true})
    name: string;

    @Field()
    type: string;

    @Field(() => Organization)
    organization: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

    @Field(() => Fair, {nullable:true})
    fair: Fair;

    @Field(() => UserConnection, {nullable : true})
    members: UserConnection;
}