import {Arg, FieldResolver, Maybe, Query, Resolver, Root} from 'type-graphql';
import {Company} from '../schemas/Company';
import db, {sql} from '../dbconfig/dbconfig';
import {Organization} from '../schemas/Organization';
import {getAllCompanies, getCompanyById} from '../queries/CompanyQueries';
import {getOrganizationById} from '../queries/OrganizationQueries';
import {convertFromGlobalId, convertIdsToGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';

@Resolver((of) => Company)
export class CompanyResolver {

    @Query((returns) => [Company], { nullable: true })
    async getCompanys(): Promise<Company[]> {
        const companys = await getAllCompanies();
        return convertIdsToGlobalId('company', companys);
    }

    @Query((returns) => Company, { nullable: true })
    async company(@Arg("id") companyId : string): Promise<Maybe<Company>> {
        const companys = await getCompanyById(convertFromGlobalId(companyId).id);
        return convertIdToGlobalId('company', companys[0]);
    }

    @FieldResolver(is => Organization, {description: ''})
    async organization(@Root() company: Company): Promise<Organization> {
        const organizations = await getOrganizationById(company.organization);
        return convertIdToGlobalId('orangization', organizations[0]);
    }

}