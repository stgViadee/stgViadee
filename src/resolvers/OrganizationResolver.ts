import {Arg, FieldResolver, Maybe, Query, Resolver, Root} from 'type-graphql';
import {Organization} from '../schemas/Organization';
import {User} from '../schemas/User';
import {getUserById} from '../queries/UserQueries';
import {getAllOrganizations, getOrganizationById} from '../queries/OrganizationQueries';
import {convertFromGlobalId, convertIdsToGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';

@Resolver((of) => Organization)
export class OrganizationResolver {

    @Query((returns) => [Organization], { nullable: true })
    async getOrganizations(): Promise<Organization[]> {
        const organizations = await getAllOrganizations();
        return convertIdsToGlobalId('organization', organizations);
    }

    @Query((returns) => Organization, { nullable: true })
    async organization(@Arg("id") organizationId : string): Promise<Maybe<Organization>> {
        const organizations = await getOrganizationById(convertFromGlobalId(organizationId).id)
        return convertIdToGlobalId('organization', organizations[0]);
    }

    @FieldResolver(is => User, {description: ''})
    async author(@Root() organization: Organization): Promise<User> {
        const users = await getUserById(organization.author)
        return convertIdToGlobalId('user', users[0]);
    }

}