import {Arg, FieldResolver, Maybe, Query, Resolver, Root} from 'type-graphql';
import {Organization} from '../schemas/Organization';
import db, {sql} from '../dbconfig/dbconfig';
import {User} from '../schemas/User';
import {getUserById} from '../queries/UserQueries';
import {getAllOrganizations, getOrganizationById} from '../queries/OrganizationQueries';

@Resolver((of) => Organization)
export class OrganizationResolver {
    private organizations: Organization[] = []
    private users: User[] = []

    @Query((returns) => [Organization], { nullable: true })
    async getOrganizations(): Promise<Organization[]> {
        this.organizations = await getAllOrganizations();
        return this.organizations;
    }

    @Query((returns) => Organization, { nullable: true })
    async organization(@Arg("id") id : string): Promise<Maybe<Organization>> {
        this.organizations = await getOrganizationById(id)
        return this.organizations[0];
    }

    @FieldResolver(is => User, {description: ''})
    async author(@Root() organization: Organization): Promise<User> {
        this.users = await getUserById(organization.author)
        return this.users[0];
    }

}