import {Query, Resolver, Arg, Maybe, FieldResolver, Root} from 'type-graphql';
import {Meeting} from '../schemas/Meeting';
import {User} from '../schemas/User';
import {getAllMeetings, getMeetingById} from '../queries/MeetingQueries';
import {getUserAttendingMeetingByMeetingId, getUserById} from '../queries/UserQueries';
import {convertFromGlobalId, convertIdsToGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';

@Resolver((of) => Meeting)
export class MeetingResolver {
    private meetings: Meeting[] = []
    private users: User[] = []

    @Query((returns) => [Meeting], { nullable: true })
    async getMeetings(): Promise<Meeting[]> {
        this.meetings = await getAllMeetings();
        return convertIdsToGlobalId('meeting', this.meetings);
    }

    @Query((returns) => Meeting, { nullable: true })
    async meeting(@Arg("id") meetingId : string): Promise<Maybe<Meeting>> {
        this.meetings = await getMeetingById(convertFromGlobalId(meetingId).id);
        return convertIdToGlobalId('meeting', this.meetings[0]);
    }

    @FieldResolver(is => User, {description: ''})
    async organizer(@Root() meeting: Meeting): Promise<User> {
        this.users = await getUserById(meeting.organizer);
        return convertIdToGlobalId('user', this.users[0]);
    }

    @FieldResolver(is => [User], {description: ''})
    async attendees(@Root() meeting: Meeting): Promise<Iterable<User>> {
        this.users = await getUserAttendingMeetingByMeetingId(convertFromGlobalId(meeting.id).id)
        return convertIdsToGlobalId('user', this.users);
    }

}