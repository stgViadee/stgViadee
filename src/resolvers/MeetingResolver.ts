import {Query, Resolver, Arg, Maybe, FieldResolver, Root} from 'type-graphql';
import db, {sql} from '../dbconfig/dbconfig';
import {Meeting} from '../schemas/Meeting';
import {User} from '../schemas/User';

@Resolver((of) => Meeting)
export class MeetingResolver {
    private meetings: Meeting[] = []
    private users: User[] = []

    @Query((returns) => [Meeting], { nullable: true })
    async getMeetings(): Promise<Meeting[]> {
        this.meetings = await db.query(sql `
            select * from fm.meeting
        `);
        return this.meetings;
    }

    @Query((returns) => Meeting, { nullable: true })
    async meeting(@Arg("id") id : string): Promise<Maybe<Meeting>> {
        this.meetings = await db.query(sql `
            select * from fm.meeting 
            where id = ${id}
        `);
        return this.meetings[0];
    }

    @FieldResolver(is => User, {description: ''})
    async organizer(@Root() meeting: Meeting): Promise<User> {
        this.users = await db.query(sql`
            select * from fm.user
            where id = ${meeting.organizer}
        `);
        return this.users[0];
    }

    @FieldResolver(is => [User], {description: ''})
    async attendees(@Root() meeting: Meeting): Promise<Iterable<User>> {
        console.log("MeetingResolver: lade attendees")
        this.users = await db.query(sql`
            SELECT "user".*
            FROM fm.user inner join fm.attendance on "user".id = attendance."user"
            WHERE attendance.meeting = ${meeting.id}
        `);
        return this.users;
    }

}