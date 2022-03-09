import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {UserProfile} from './UserProfile';

@ObjectType()
export class UserProfileEdge extends EdgeType("userProfile", UserProfile) {}

@ObjectType()
export class UserProfileConnection extends ConnectionType<UserProfileEdge>(
    "userProfile",
    UserProfileEdge,
    UserProfile
) {}