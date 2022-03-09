import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {Department} from './Department';

@ObjectType()
export class DepartmentEdge extends EdgeType("department", Department) {}

@ObjectType()
export class DepartmentConnection extends ConnectionType<DepartmentEdge>(
    "department",
    DepartmentEdge,
    Department
) {}