import {Resolver, FieldResolver, Root, Args, Query, Arg, Maybe} from 'type-graphql';
import {convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {RsvpState} from '../schemas/RsvpState';
import {Meeting} from '../schemas/Meeting';
import {getMeetingById} from '../queries/MeetingQueries';
import {User} from '../schemas/User';
import {getUserById} from '../queries/UserQueries';

@Resolver((of) => RsvpState)
export class RsvpStateResolver {

    @FieldResolver((returns) => Meeting, {description: "The meeting this is an RSVP response to."})
    async meeting(@Root() rsvpState: RsvpState): Promise<Maybe<Meeting>> {
        const meetings = await getMeetingById(rsvpState.meeting);
        return convertIdToGlobalId('meeting', meetings[0]);
    }


    @FieldResolver(is => User, {description: "The user who attends the meeting."})
    async user(@Root() rsvpState: RsvpState): Promise<User> {
        const users = await getUserById(rsvpState.user);
        return convertIdToGlobalId('user', users[0]);
    }


}