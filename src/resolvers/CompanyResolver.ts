import {Arg, FieldResolver, Maybe, Query, Resolver, Root} from 'type-graphql';
import {Company} from '../schemas/Company';
import db, {sql} from '../dbconfig/dbconfig';
import {Organization} from '../schemas/Organization';
import {getAllCompanies, getCompanyById} from '../queries/CompanyQueries';
import {getOrganizationById} from '../queries/OrganizationQueries';

@Resolver((of) => Company)
export class CompanyResolver {
    private companys: Company[] = []
    private organizations: Organization[] = []

    @Query((returns) => [Company], { nullable: true })
    async getCompanys(): Promise<Company[]> {
        this.companys = await getAllCompanies();
        return this.companys;
    }

    @Query((returns) => Company, { nullable: true })
    async company(@Arg("id") id : string): Promise<Maybe<Company>> {
        this.companys = await getCompanyById(id);
        return this.companys[0];
    }

    @FieldResolver(is => Organization, {description: ''})
    async organization(@Root() company: Company): Promise<Organization> {
        this.organizations = await getOrganizationById(company.organization);
        return this.organizations[0];
    }

}