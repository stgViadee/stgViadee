import {Arg, FieldResolver, Maybe, Query, Resolver, Root} from 'type-graphql';
import db, {sql} from '../dbconfig/dbconfig';
import {Department} from '../schemas/Department';
import {Organization} from '../schemas/Organization';

@Resolver((of) => Department)
export class DepartmentResolver {
    private departments: Department[] = []
    private organizations: Organization[] = []

    @Query((returns) => [Department], { nullable: true })
    async getDepartments(): Promise<Department[]> {
        console.log("DepartmentResolver: getAll")
        this.departments = await db.query(sql `
            select id, hid, name, organization, added, changed
            from fm.department
        `);
        return this.departments;
    }

    @Query((returns) => Department, { nullable: true })
    async department(@Arg("id") id : string): Promise<Maybe<Department>> {
        console.log("DepartmentResolver: getById" + id)
        this.departments = await db.query(sql `
            select id, hid, name, organization, added, changed
            from fm.department
            where id = ${id}
        `);
        return this.departments[0];
    }

    @FieldResolver(is => Organization, {description: ''})
    async organization(@Root() department: Department): Promise<Organization> {
        console.log("DepartmentResolver: lade Organization nach")
        this.organizations = await db.query(sql`
            select id,name,avatar,author,added,changed,hid,credits,preferences,"autoExtendLicense","cancelReason" from fm.organization
            where id = ${department.organization}
        `);
        return this.organizations[0];
    }
}