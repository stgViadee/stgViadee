import {Arg, FieldResolver, Maybe, Query, Resolver, Root} from 'type-graphql';
import {Organization} from '../schemas/Organization';
import db, {sql} from '../dbconfig/dbconfig';
import {User} from '../schemas/User';

@Resolver((of) => Organization)
export class OrganizationResolver {
    private organizations: Organization[] = []
    private users: User[] = []

    @Query((returns) => [Organization], { nullable: true })
    async getOrganizations(): Promise<Organization[]> {
        this.organizations = await db.query(sql `
            select * from fm.organization
            FROM fm.organization
        `);
        return this.organizations;
    }

    @Query((returns) => Organization, { nullable: true })
    async organization(@Arg("id") id : string): Promise<Maybe<Organization>> {
        this.organizations = await db.query(sql `
            select * from fm.organization
            FROM fm.organization
            where id = ${id}
        `);
        return this.organizations[0];
    }

    @FieldResolver(is => User, {description: ''})
    async author(@Root() organization: Organization): Promise<User> {
        this.users = await db.query(sql`
            select * from fm.user
            where id = ${organization.author}
        `);
        return this.users[0];
    }



}