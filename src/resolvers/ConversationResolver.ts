import {FieldResolver, Resolver, Root} from 'type-graphql';
import {Conversation} from '../schemas/Conversation';
import db, {sql} from '../dbconfig/dbconfig';
import {User} from '../schemas/User';

@Resolver((of) => Conversation)
export class ConversationResolver {
    private users: User[] = []

    @FieldResolver(is => User, {description: ''})
    async user(@Root() conversation: Conversation): Promise<User> {
        this.users = await db.query(sql`
            select * from fm.user
            where id = ${conversation.user}
        `);
        return this.user[0];
    }

    @FieldResolver(is => User, {description: ''})
    async recipient(@Root() conversation: Conversation): Promise<User> {
        this.users = await db.query(sql`
            select * from fm.user
            where id = ${conversation.recipient}
        `);
        return this.user[0];
    }

}