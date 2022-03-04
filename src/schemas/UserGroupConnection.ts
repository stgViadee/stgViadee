import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {UserGroup} from './UserGroup';

@ObjectType()
export class UserGroupEdge extends EdgeType("userGroup", UserGroup) {}

@ObjectType()
export class UserGroupConnection extends ConnectionType<UserGroupEdge>(
    "userGroup",
    UserGroupEdge
) {}