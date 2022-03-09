import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {Organization} from './Organization';

@ObjectType()
export class OrganizationEdge extends EdgeType("organization", Organization) {}

@ObjectType()
export class OrganizationConnection extends ConnectionType<OrganizationEdge>(
    "organization",
    OrganizationEdge,
    Organization
) {}