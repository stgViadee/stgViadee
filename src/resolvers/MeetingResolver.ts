import {Query, Resolver, Arg, Maybe, FieldResolver, Root} from 'type-graphql';
import {Meeting} from '../schemas/Meeting';
import {User} from '../schemas/User';
import {getAllMeetings, getMeetingById} from '../queries/MeetingQueries';
import {
    getUserAttendingMeetingByMeetingId,
    getUserById,
    getUsersByIdArray
} from '../queries/UserQueries';
import {convertFromGlobalId, convertIdsToGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {FairResource} from '../schemas/FairResource';
import {getFairResourceByIdArray} from '../queries/FairResourceQueries';
import {Loader} from 'type-graphql-dataloader';
import DataLoader from 'dataloader';
import {Guest} from '../schemas/Guest';
import {getGuestsByMeetingId} from './GuestQueries';

@Resolver((of) => Meeting)
export class MeetingResolver {

    @FieldResolver(is => User, {description: ''})
    @Loader<string, User>(async (ids) => {  // batchLoadFn
        var result = await getUsersByIdArray(ids);
        return convertIdsToGlobalId('user', result);
    })
    async organizer(@Root() meeting: Meeting) {
        return (dataloader: DataLoader<string, User>) =>
            dataloader.load(meeting.organizer);
    }

    @FieldResolver(is => FairResource, {description: ''})
    @Loader<string, FairResource>(async (ids) => {  // batchLoadFn
        var result = await getFairResourceByIdArray(ids);
        return convertIdsToGlobalId('fairResource', result);
    })
    async resource(@Root() meeting: Meeting) {
        return (dataloader: DataLoader<string, FairResource>) =>
            dataloader.load(meeting.resource);
    }

    @FieldResolver(is => [User], {description: ''})
    async attendees(@Root() meeting: Meeting): Promise<User[]> {
        const users = await getUserAttendingMeetingByMeetingId(convertFromGlobalId(meeting.id).id)
        return convertIdsToGlobalId('user', users);
    }

    @FieldResolver(is => [Guest], {description: ''})
    async guests(@Root() meeting: Meeting): Promise<Guest[]> {
        var {type, id } = convertFromGlobalId(meeting.id);
        const guests = await getGuestsByMeetingId(id)
        return convertIdsToGlobalId('guest', guests);
    }


    @Query((returns) => [Meeting], { nullable: true })
    async getMeetings(): Promise<Meeting[]> {
        const meetings = await getAllMeetings();
        return convertIdsToGlobalId('meeting', meetings);
    }

    @Query((returns) => Meeting, { nullable: true })
    async meeting(@Arg("id") meetingId : string): Promise<Maybe<Meeting>> {
        const meetings = await getMeetingById(convertFromGlobalId(meetingId).id);
        return convertIdToGlobalId('meeting', meetings[0]);
    }




}