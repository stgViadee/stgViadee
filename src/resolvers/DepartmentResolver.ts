import {Arg, FieldResolver, Maybe, Query, Resolver, Root} from 'type-graphql';
import {Department} from '../schemas/Department';
import {Organization} from '../schemas/Organization';
import {getAllDepartments, getDepartmentById} from '../queries/DepartmentQueries';
import {getOrganizationById} from '../queries/OrganizationQueries';
import {convertFromGlobalId, convertIdsToGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';

@Resolver((of) => Department)
export class DepartmentResolver {

    @Query((returns) => [Department], { nullable: true })
    async getDepartments(): Promise<Department[]> {
        const departments = await getAllDepartments();
        return convertIdsToGlobalId('department', departments);
    }

    @Query((returns) => Department, { nullable: true })
    async department(@Arg("id") departmentId : string): Promise<Maybe<Department>> {
        const departments = await getDepartmentById(convertFromGlobalId(departmentId).id);
        return convertIdToGlobalId('department', departments[0]);
    }

    @FieldResolver(is => Organization, {description: ''})
    async organization(@Root() department: Department): Promise<Organization> {
        const organizations = await getOrganizationById(department.organization);
        return convertIdToGlobalId('organization', organizations[0]);
    }
}