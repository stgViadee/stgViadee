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
        console.log("MeetingResolver: getAll")
        this.meetings = await db.query(sql `
            select id,start,"end",title,"isIcalUpdatePending","sequenceCount",notes,color,display,resource,organizer,added,changed,hid,"requiresCatering" from fm.meeting
        `);
        return this.meetings;
    }

    @Query((returns) => Meeting, { nullable: true })
    async meeting(@Arg("id") id : string): Promise<Maybe<Meeting>> {
        console.log("MeetingResolver: getById " + id)
        this.meetings = await db.query(sql `
            select id,start,"end",title,"isIcalUpdatePending","sequenceCount",notes,color,display,resource,organizer,added,changed,hid,"requiresCatering" from fm.meeting 
            where id = ${id}
        `);
        return this.meetings[0];
    }

    @FieldResolver(is => User, {description: ''})
    async organizer(@Root() meeting: Meeting): Promise<User> {
        console.log("MeetingResolver: lade organizer")
        this.users = await db.query(sql`
            select id,email,password,"hasActiveConnection","lastAuthenticated","createdBy","invitationSent","invitationSentBy","isDisabled",added,changed,"usesAuthEmailProxy",hid,preferences,"emailValidated","hasMobileDevices" from fm.user
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