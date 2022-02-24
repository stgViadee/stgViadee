import {Arg, FieldResolver, Maybe, Query, Resolver, Root} from 'type-graphql';
import {Department} from '../schemas/Department';
import {Organization} from '../schemas/Organization';
import {getAllDepartments, getDepartmentById} from '../queries/DepartmentQueries';
import {getOrganizationById} from '../queries/OrganizationQueries';
import {convertFromGlobalId, convertIdsToGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';

@Resolver((of) => Department)
export class DepartmentResolver {
    private departments: Department[] = []
    private organizations: Organization[] = []

    @Query((returns) => [Department], { nullable: true })
    async getDepartments(): Promise<Department[]> {
        this.departments = await getAllDepartments();
        return convertIdsToGlobalId('department', this.departments);
    }

    @Query((returns) => Department, { nullable: true })
    async department(@Arg("id") departmentId : string): Promise<Maybe<Department>> {
        this.departments = await getDepartmentById(convertFromGlobalId(departmentId).id);
        return convertIdToGlobalId('department', this.departments[0]);
    }

    @FieldResolver(is => Organization, {description: ''})
    async organization(@Root() department: Department): Promise<Organization> {
        this.organizations = await getOrganizationById(department.organization);
        return convertIdToGlobalId('organization', this.organizations[0]);
    }
}