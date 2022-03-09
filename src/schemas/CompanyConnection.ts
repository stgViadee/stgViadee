import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {Company} from './Company';

@ObjectType()
export class CompanyEdge extends EdgeType("company", Company) {}

@ObjectType()
export class CompanyConnection extends ConnectionType<CompanyEdge>(
    "company",
    CompanyEdge,
    Company
) {}