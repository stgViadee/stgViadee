import {Arg, FieldResolver, Maybe, Query, Resolver, Root} from 'type-graphql';
import {Conversation} from '../schemas/Conversation';
import db, {sql} from '../dbconfig/dbconfig';
import {Organization} from '../schemas/Organization';
import {User} from '../schemas/User';
import {Fair} from '../schemas/Fair';

@Resolver((of) => Conversation)
export class ConversationResolver {
    private users: User[] = []

    @FieldResolver(is => User, {description: ''})
    async user(@Root() conversation: Conversation): Promise<User> {
        console.log("ConversationResolver: lade User nach")
        this.users = await db.query(sql`
            select id,email,password,"hasActiveConnection","lastAuthenticated","createdBy","invitationSent","invitationSentBy","isDisabled",added,changed,"usesAuthEmailProxy",hid,preferences,"emailValidated","hasMobileDevices" from fm.user
            where id = ${conversation.user}
        `);
        return this.user[0];
    }

    @FieldResolver(is => User, {description: ''})
    async recipient(@Root() conversation: Conversation): Promise<User> {
        console.log("ConversationResolver: lade User nach")
        this.users = await db.query(sql`
            select id,email,password,"hasActiveConnection","lastAuthenticated","createdBy","invitationSent","invitationSentBy","isDisabled",added,changed,"usesAuthEmailProxy",hid,preferences,"emailValidated","hasMobileDevices" from fm.user
            where id = ${conversation.recipient}
        `);
        return this.user[0];
    }

}