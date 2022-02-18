import DataLoader from 'dataloader';
import {Query, Resolver, Arg, Maybe, FieldResolver, Root} from 'type-graphql';
import {Fair} from '../schemas/Fair';
import db, {sql} from '../dbconfig/dbconfig';
import {User} from '../schemas/User';
import {Organization} from '../schemas/Organization';
import {Loader} from 'type-graphql-dataloader';


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
    @Loader<string, User>(async (ids) => {  // batchLoadFn
       return await db.query(sql`
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
            where id = ANY (${ids}::uuid[])
        `);
    })
    async author(@Root() fair: Fair) {
        return (dataloader: DataLoader<string, User>) =>
            dataloader.load(fair.author);
    }

    @FieldResolver(is => Organization, {description: ''})
    @Loader<string, User>(async (ids) => {  // batchLoadFn
        return await db.query(sql`
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
            where id = ANY (${ids}::uuid[])
        `);
    })
    async organization(@Root() fair: Fair) {
        return (dataloader: DataLoader<string, Organization>) =>
            dataloader.load(fair.organization);
    }
}