import {Arg, FieldResolver, Maybe, Query, Resolver, Root} from 'type-graphql';
import {Organization} from '../schemas/Organization';
import {User} from '../schemas/User';
import {getUserById} from '../queries/UserQueries';
import {getAllOrganizations, getOrganizationById} from '../queries/OrganizationQueries';
import {convertFromGlobalId, convertIdsToGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';

@Resolver((of) => Organization)
export class OrganizationResolver {
    private organizations: Organization[] = []
    private users: User[] = []

    @Query((returns) => [Organization], { nullable: true })
    async getOrganizations(): Promise<Organization[]> {
        this.organizations = await getAllOrganizations();
        return convertIdsToGlobalId('organization', this.organizations);
    }

    @Query((returns) => Organization, { nullable: true })
    async organization(@Arg("id") organizationId : string): Promise<Maybe<Organization>> {
        this.organizations = await getOrganizationById(convertFromGlobalId(organizationId).id)
        return convertIdToGlobalId('organization', this.organizations[0]);
    }

    @FieldResolver(is => User, {description: ''})
    async author(@Root() organization: Organization): Promise<User> {
        this.users = await getUserById(organization.author)
        return convertIdToGlobalId('user', this.users[0]);
    }

}