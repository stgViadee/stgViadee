import {Resolver, FieldResolver, Root, Args, Query, Arg, Maybe, Info} from 'type-graphql';
import {convertFromGlobalId, convertIdsToGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {User} from '../schemas/User';
import {getUserById, getUsersByIdArray} from '../queries/UserQueries';
import {StaffMember} from '../schemas/StaffMember';
import {Loader} from 'type-graphql-dataloader';
import DataLoader from 'dataloader';
import {Fair} from '../schemas/Fair';
import {getFairsByIdArray} from '../queries/FairQueries';
import {Booth} from '../schemas/Booth';
import {getBoothsByIdArray} from '../queries/BoothQueries';
import {Timeframe} from '../schemas/Timeframe';
import {getTimeframesByStaffMemberId} from '../queries/TimeframeQueries';
import {UserProfile} from '../schemas/UserProfile';
import {getUserProfileByStaffMemberId} from '../queries/UserProfileQueries';
import {MeetingConnection} from '../schemas/MeetingConnection';
import {ConnectionArgs} from '../schemas/relay/ConnectionArgs';
import {generateFilterType} from 'type-graphql-filter';
import {Meeting} from '../schemas/Meeting';
import {
    getMeetingByFairIdFilteredCount,
    getMeetingByFairIdFilteredPaginated,
    getMeetingByStaffMemberIdFilteredCount, getMeetingByStaffMemberIdFilteredPaginated
} from '../queries/MeetingQueries';
import {offsetToCursor} from 'graphql-relay';
import {UserGroupConnection} from '../schemas/UserGroupConnection';
import {getUserGroupsByStaffMemberIdCount, getUserGroupsByStaffMemberIdPaginated} from '../queries/UserGroupQueries';
import {OrderConnection} from '../schemas/OrderConnection';
import {
    getOrdersCreatedByUserIdCount,
    getOrdersCreatedByUserIdPaginated,
    getOrdersReceivedByUserIdCount, getOrdersReceivedByUserIdPaginated
} from '../queries/OrderQueries';

@Resolver((of) => StaffMember)
export class StaffMemberResolver {

    @FieldResolver(is => User, {description: "The user who partakes in the fair."})
    async user(@Root() staffMember: StaffMember) {
        const user =  await getUserById(staffMember.user);
        return convertIdToGlobalId('userProfile', user[0]);
    }

    @FieldResolver(is => Fair, {description: "The fair the user partakes in."})
    @Loader<string, Fair>(async (ids) => {  // batchLoadFn
        let result = await getFairsByIdArray(ids);
        return convertIdsToGlobalId('fair', result);
    })
    async fair(@Root() staffMember: StaffMember) {
        return (dataloader: DataLoader<string, Fair>) =>
            dataloader.load(staffMember.fair);
    }

    @FieldResolver(is => Booth, {description: "The booth this user will mostly be attending."})
    @Loader<string, Booth>(async (ids) => {  // batchLoadFn
        let result = await getBoothsByIdArray(ids);
        return convertIdsToGlobalId('booth', result);
    })
    async primaryBooth(@Root() staffMember: StaffMember) {
        return (dataloader: DataLoader<string, Booth>) =>
            dataloader.load(staffMember.primaryBooth);
    }

    @FieldResolver(is => Booth, {description: "The booth the user is currently attending or will return to, if they're unavailable."})
    @Loader<string, Booth>(async (ids) => {  // batchLoadFn
        let result = await getBoothsByIdArray(ids);
        return convertIdsToGlobalId('booth', result);
    })
    async currentBooth(@Root() staffMember: StaffMember) {
        return (dataloader: DataLoader<string, Booth>) =>
            dataloader.load(staffMember.currentBooth);
    }


    @FieldResolver(is => [Timeframe], {description: "The time frames during which the user will be attending the fair."})
    async attendance(@Root() staffMember: StaffMember): Promise<Timeframe[]> {
        const attendances =  await getTimeframesByStaffMemberId(convertFromGlobalId(staffMember.id).id);
        return convertIdsToGlobalId('timeframe', attendances);
    }

    @FieldResolver(is => UserProfile, {description: "The merged user profile data for this user at the fair they are attending."})
    async userProfile(@Root() staffMember: StaffMember) {
        const userProfiles =  await getUserProfileByStaffMemberId(convertFromGlobalId(staffMember.id).id);
        return convertIdToGlobalId('userProfile', userProfiles[0]);
    }

    @FieldResolver(is => MeetingConnection, {
        description: "The meetings this user attends at the fair.",
    })
    async meetings(
        @Args() args: ConnectionArgs,
        @Root() staffMember: StaffMember,
        @Arg('filter', generateFilterType(StaffMember)) filter: any
    ): Promise<MeetingConnection> {
        args.validateArgs();

        const {type, id} = convertFromGlobalId(staffMember.id);
        const countResult = await getMeetingByStaffMemberIdFilteredCount(id, filter);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getMeetingByStaffMemberIdFilteredPaginated(id, filter, bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('meeting', entity)
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo
        };
    }

    @FieldResolver(is => UserGroupConnection, {
        description: "The groups this staff member is a member of.",
    })
    async groups(
        @Args() args: ConnectionArgs,
        @Root() staffMember: StaffMember
    ): Promise<UserGroupConnection> {

        const userIdMock = 'f6265805-0dab-4de0-9297-80ed6e916b44';
        const userId = userIdMock;  // TODO userId aus Kontext laden -> hier temp. Mock

        args.validateArgs();

        const {type, id} = convertFromGlobalId(staffMember.id);
        const countResult = await getUserGroupsByStaffMemberIdCount(id, userId);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getUserGroupsByStaffMemberIdPaginated(id, userId, bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('userGroup', entity)
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo
        };
    }

    @FieldResolver(is => OrderConnection, {
        description: "Orders this user has created.",
    })
    async ordersCreated(
        @Args() args: ConnectionArgs,
        @Root() staffMember: StaffMember
    ): Promise<OrderConnection> {

        args.validateArgs();

        const countResult = await getOrdersCreatedByUserIdCount(staffMember.user);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getOrdersCreatedByUserIdPaginated(staffMember.user, bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('order', entity)
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo
        };
    }

    @FieldResolver(is => OrderConnection, {
        description: "Orders this user has created.",
    })
    async ordersReceived(
        @Args() args: ConnectionArgs,
        @Root() staffMember: StaffMember
    ): Promise<OrderConnection> {

        args.validateArgs();

        const countResult = await getOrdersReceivedByUserIdCount(staffMember.user);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getOrdersReceivedByUserIdPaginated(staffMember.user, bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('order', entity)
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo
        };
    }








}