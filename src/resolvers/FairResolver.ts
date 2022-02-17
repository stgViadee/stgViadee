import {Query, Resolver, Arg, Maybe, FieldResolver, Root} from 'type-graphql';
import {Fair} from '../schemas/Fair';
import db, {sql} from '../dbconfig/dbconfig';
import {User} from '../schemas/User';
import {Organization} from '../schemas/Organization';


@Resolver((of) => Fair)
export class FairResolver {
    private fairs: Fair[] = [];
    private users: User[] = [];
    private organizations: Organization[] = [];

    @Query((returns) => [Fair], {nullable: true})
    async getFairs(): Promise<Fair[]> {
        console.log('FairResolver: getAll');
        this.fairs = await db.query(sql`
            select id,
                   name,
                   timezone,
                   author,
                   features,
                   organization,
                   added,
                   changed,
                   hid
            from fm.fair
        `);
        return this.fairs;
    }

    @Query((returns) => Fair, {nullable: true})
    async fair(@Arg('id') id: string): Promise<Maybe<Fair>> {
        console.log('FairResolver: getById');
        this.fairs = await db.query(sql`
            select id,
                   name,
                   timezone,
                   author,
                   features,
                   organization,
                   added,
                   changed,
                   hid
            from fm.fair
            where id = ${id}
        `);
        return this.fairs[0];
    }

    @FieldResolver(is => User, {description: ''})
    async author(@Root() fair: Fair): Promise<User> {
        console.log('FairResolver: lade Autor nach');
        this.users = await db.query(sql`
            select id,
                   email,
                   password,
                   "hasActiveConnection",
                   "lastAuthenticated",
                   "createdBy",
                   "invitationSent",
                   "invitationSentBy",
                   "isDisabled",
                   added,
                   changed,
                   "usesAuthEmailProxy",
                   hid,
                   preferences,
                   "emailValidated",
                   "hasMobileDevices"
            from fm.user
            where id = ${fair.author}
        `);
        return this.users[0];
    }

    @FieldResolver(is => Organization, {description: ''})
    async organization(@Root() fair: Fair): Promise<Organization> {
        console.log('FairResolver: lade Organization nach');
        this.organizations = await db.query(sql`
            select id,
                   name,
                   avatar,
                   author,
                   added,
                   changed,
                   hid,
                   credits,
                   preferences,
                   "autoExtendLicense",
                   "cancelReason"
            from fm.organization
            where id = ${fair.organization}
        `);
        return this.organizations[0];
    }
}