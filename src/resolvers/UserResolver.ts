import {Query, Resolver, Arg, Maybe, FieldResolver, Root} from 'type-graphql';
import db, {sql} from '../dbconfig/dbconfig';
import {User} from '../schemas/User';

@Resolver((of) => User)
export class UserResolver {
    private users: User[] = []

    @Query((returns) => [User], { nullable: true })
    async getUsers(): Promise<User[]> {
        console.log("UserResolver: getAll")
        this.users = await db.query(sql `
            select id,email,password,"hasActiveConnection","lastAuthenticated","createdBy","invitationSent","invitationSentBy","isDisabled",added,changed,"usesAuthEmailProxy",hid,preferences,"emailValidated","hasMobileDevices" from fm.user
        `);
        return this.users;
    }

    @Query((returns) => User, { nullable: true })
    async user(@Arg("id") id : string): Promise<Maybe<User>> {
        console.log("UserResolver: getById")
        this.users = await db.query(sql `
            select id,email,password,"hasActiveConnection","lastAuthenticated","createdBy","invitationSent","invitationSentBy","isDisabled",added,changed,"usesAuthEmailProxy",hid,preferences,"emailValidated","hasMobileDevices" from fm.user 
            where id = ${id}
        `);
        return this.users[0];
    }

    @FieldResolver(is => User, {description: ''})
    async createdBy(@Root() user: User): Promise<User> {
        console.log("UserResolver: lade CreatedBy")
        this.users = await db.query(sql`
            select id,email,password,"hasActiveConnection","lastAuthenticated","createdBy","invitationSent","invitationSentBy","isDisabled",added,changed,"usesAuthEmailProxy",hid,preferences,"emailValidated","hasMobileDevices" from fm.user
            where id = ${user.createdBy}
        `);
        return this.users[0];
    }


}