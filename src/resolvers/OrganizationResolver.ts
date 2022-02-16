import {Arg, FieldResolver, Maybe, Query, Resolver, Root} from 'type-graphql';
import {Organization} from '../schemas/Organization';
import db, {sql} from '../dbconfig/dbconfig';

@Resolver((of) => Organization)
export class OrganizationResolver {
    private organizations: Organization[] = []

    @Query((returns) => [Organization], { nullable: true })
    async getOrganizations(): Promise<Organization[]> {
        console.log("OrganizationResolver: getAll")
        this.organizations = await db.query(sql `
            select id,name,avatar,author,added,changed,hid,credits,preferences,"autoExtendLicense","cancelReason" from fm.organization
            FROM fm.organization
        `);
        return this.organizations;
    }

    @Query((returns) => Organization, { nullable: true })
    async organization(@Arg("id") id : string): Promise<Maybe<Organization>> {
        console.log("OrganizationResolver: getById" + id)
        this.organizations = await db.query(sql `
            select id,name,avatar,author,added,changed,hid,credits,preferences,"autoExtendLicense","cancelReason" from fm.organization
            FROM fm.organization
            where id = ${id}
        `);
        return this.organizations[0];
    }



}