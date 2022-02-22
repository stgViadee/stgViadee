import {Arg, FieldResolver, Maybe, Query, Resolver, Root} from 'type-graphql';
import db, {sql} from '../dbconfig/dbconfig';
import {Department} from '../schemas/Department';
import {Organization} from '../schemas/Organization';
import {getAllDepartments, getDepartmentById} from '../queries/DepartmentQueries';
import {getOrganizationById} from '../queries/OrganizationQueries';

@Resolver((of) => Department)
export class DepartmentResolver {
    private departments: Department[] = []
    private organizations: Organization[] = []

    @Query((returns) => [Department], { nullable: true })
    async getDepartments(): Promise<Department[]> {
        this.departments = await getAllDepartments();
        return this.departments;
    }

    @Query((returns) => Department, { nullable: true })
    async department(@Arg("id") id : string): Promise<Maybe<Department>> {
        this.departments = await getDepartmentById(id);
        return this.departments[0];
    }

    @FieldResolver(is => Organization, {description: ''})
    async organization(@Root() department: Department): Promise<Organization> {
        this.organizations = await getOrganizationById(department.organization);
        return this.organizations[0];
    }
}