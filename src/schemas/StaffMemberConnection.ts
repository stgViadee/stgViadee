import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {StaffMember} from './StaffMember';

@ObjectType()
export class StaffMemberEdge extends EdgeType("staffMember", StaffMember) {}

@ObjectType()
export class StaffMemberConnection extends ConnectionType<StaffMemberEdge>(
    "staffMember",
    StaffMemberEdge
) {}