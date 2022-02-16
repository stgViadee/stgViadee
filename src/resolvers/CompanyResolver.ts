import {Arg, FieldResolver, Maybe, Query, Resolver, Root} from 'type-graphql';
import {Company} from '../schemas/Company';
import db, {sql} from '../dbconfig/dbconfig';
import {Organization} from '../schemas/Organization';

@Resolver((of) => Company)
export class CompanyResolver {
    private companys: Company[] = []
    private organizations: Organization[] = []

    @Query((returns) => [Company], { nullable: true })
    async getCompanys(): Promise<Company[]> {
        console.log("CompanyResolver: getAll")
        this.companys = await db.query(sql `
            select id, hid, name, organization, added, changed
            FROM fm.company
        `);
        return this.companys;
    }

    @Query((returns) => Company, { nullable: true })
    async company(@Arg("id") id : string): Promise<Maybe<Company>> {
        console.log("CompanyResolver: getById" + id)
        this.companys = await db.query(sql `
            select id, hid, name, organization, added, changed
            FROM fm.company
            where id = ${id}
        `);
        return this.companys[0];
    }

    @FieldResolver(is => Organization, {description: ''})
    async organization(@Root() company: Company): Promise<Organization> {
        console.log("CompanyResolver: lade Fair nach")
        this.organizations = await db.query(sql`
            select id,name,avatar,author,added,changed,hid,credits,preferences,"autoExtendLicense","cancelReason" from fm.organization
            where id = ${company.organization}
        `);
        return this.organizations[0];
    }

}