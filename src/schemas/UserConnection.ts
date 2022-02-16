import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {User} from './User';

@ObjectType()
export class UserEdge extends EdgeType("user", User) {}

@ObjectType()
export class UserConnection extends ConnectionType<UserEdge>(
    "user",
    UserEdge
) {}