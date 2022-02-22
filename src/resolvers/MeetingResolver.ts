import {Query, Resolver, Arg, Maybe, FieldResolver, Root} from 'type-graphql';
import {Meeting} from '../schemas/Meeting';
import {User} from '../schemas/User';
import {getAllMeetings, getMeetingById} from '../queries/MeetingQueries';
import {getUserAttendingMeetingByMeetingId, getUserById} from '../queries/UserQueries';

@Resolver((of) => Meeting)
export class MeetingResolver {
    private meetings: Meeting[] = []
    private users: User[] = []

    @Query((returns) => [Meeting], { nullable: true })
    async getMeetings(): Promise<Meeting[]> {
        this.meetings = await getAllMeetings();
        return this.meetings;
    }

    @Query((returns) => Meeting, { nullable: true })
    async meeting(@Arg("id") id : string): Promise<Maybe<Meeting>> {
        this.meetings = await getMeetingById(id);
        return this.meetings[0];
    }

    @FieldResolver(is => User, {description: ''})
    async organizer(@Root() meeting: Meeting): Promise<User> {
        this.users = await getUserById(meeting.organizer);
        return this.users[0];
    }

    @FieldResolver(is => [User], {description: ''})
    async attendees(@Root() meeting: Meeting): Promise<Iterable<User>> {
        this.users = await getUserAttendingMeetingByMeetingId(meeting.id)
        return this.users;
    }

}