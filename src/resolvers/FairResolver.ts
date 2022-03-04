import DataLoader from 'dataloader';
import {Query, Resolver, Arg, Maybe, FieldResolver, Root, Ctx, Args, Info} from 'type-graphql';
import {Fair} from '../schemas/Fair';
import {User} from '../schemas/User';
import {Organization} from '../schemas/Organization';
import {Loader} from 'type-graphql-dataloader';
import {FairFeatures} from '../schemas/FairFeatures';
import {FairDayConnection} from '../schemas/FairDayConnection';
import {ConnectionArgs} from '../schemas/relay/ConnectionArgs';
import {generateFilterType} from 'type-graphql-filter';
import {FairDay} from '../schemas/FairDay';
import {offsetToCursor} from 'graphql-relay';
import {BoothConnection} from '../schemas/BoothConnection';
import {getAllFairs, getFairById} from '../queries/FairQueries';
import {getOrganizationsByIdArray} from '../queries/OrganizationQueries';
import {
    getCountOfTodaysFairDays,
    getFairDayByFairIdFilteredCount,
    getFairDayByFairIdPaginated
} from '../queries/FairDayQueries';
import {getBoothByFairIdCount, getBoothByFairIdPaginated} from '../queries/BoothQueries';
import {getUsersByIdArray} from '../queries/UserQueries';
import {convertFromGlobalId, convertIdsToGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {FairResourceConnection} from '../schemas/FairResourceConnection';
import {FairResource} from '../schemas/FairResource';
import {
    getFairResourceByFairIdFilteredCount,
    getFairResourceByFairIdFilteredPaginated
} from '../queries/FairResourceQueries';
import {FairInfoConnection} from '../schemas/FairInfoConnection';
import {getFairInfoByFairIdFilteredCount, getFairInfoByFairIdFilteredPaginated} from '../queries/FairInfoQueries';
import {FairInfo} from '../schemas/FairInfo';
import {FairProductConnection} from '../schemas/FairProductConnection';
import {getFairProductByFairIdCount, getFairProductByFairIdPaginated} from '../queries/FairProductQueries';
import {PrinterConnection} from '../schemas/PrinterConnection';
import {getPrinterByFairIdCount, getPrinterByFairIdPaginated} from '../queries/PrinterQueries';
import {FairDeviceConnection} from '../schemas/FairDeviceConnection';
import {getFairDeviceByFairIdCount, getFairDeviceByFairIdPaginated} from '../queries/FairDeviceQueries';
import {MeetingConnection} from '../schemas/MeetingConnection';
import {getMeetingByFairIdFilteredCount, getMeetingByFairIdFilteredPaginated} from '../queries/MeetingQueries';
import {Meeting} from '../schemas/Meeting';
import {StaffMemberConnection} from '../schemas/StaffMemberConnection';
import {GraphQLResolveInfo} from 'graphql';
import {
    getStaffMemberByFairIdCount,
    getStaffMemberByFairIdPaginated
} from '../queries/StaffMemberQueries';
import {OrderConnection} from '../schemas/OrderConnection';
import {getOrderByFairIdCount, getOrderByFairIdPaginated} from '../queries/OrderQueries';

@Resolver((of) => Fair)
export class FairResolver {

    @Query((returns) => [Fair], {nullable: true})
    async getFairs(): Promise<Fair[]> {
        const fairs = await getAllFairs();
        return convertIdsToGlobalId('fair', fairs);
    }


    @Query((returns) => Fair, {nullable: true})
    async fair(@Arg('id') id: string): Promise<Maybe<Fair>> {
        const fairs = await getFairById(convertFromGlobalId(id).id);
        return convertIdToGlobalId('fair', fairs[0]);
    }

    @FieldResolver(() => FairFeatures, {description: 'The feature set for this fair.'})
    async features(@Root() fair: Fair): Promise<FairFeatures> {
        return Object.assign(new FairFeatures(), fair.features);
    }

    @FieldResolver(is => User, {description: ''})
    @Loader<string, User>(async (ids) => {  // batchLoadFn
        let result = await getUsersByIdArray(ids);
        return convertIdsToGlobalId('user', result);
    })
    async author(@Root() fair: Fair) {
        return (dataloader: DataLoader<string, User>) =>
            dataloader.load(fair.author);
    }

    @FieldResolver(is => Organization, {description: ''})
    @Loader<string, Organization>(async (ids) => {  // batchLoadFn
        let result = await getOrganizationsByIdArray(ids);
        return convertIdsToGlobalId('organization', result);
    })
    async organization(@Root() fair: Fair) {
        return (dataloader: DataLoader<string, Organization>) =>
              dataloader.load(fair.organization);
    }

    @FieldResolver(() => FairDayConnection, {description: 'The days during which the fair takes place'})
    async days(
        @Args() args: ConnectionArgs,
        @Root() fair: Fair,
        @Arg('filter', generateFilterType(FairDay)) filter: any) {

        args.validateArgs();
        const {type, id} = convertFromGlobalId(fair.id);
        const countResult = await getFairDayByFairIdFilteredCount(id, filter);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults =  await getFairDayByFairIdPaginated(id, filter, bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('fairday', entity)
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo
        };

    }



    @FieldResolver(is => Boolean, {
        description: "Does this fair open today?",
    })
    async isToday(@Root() fair: Fair): Promise<boolean> {
        const countResult = await getCountOfTodaysFairDays(convertFromGlobalId(fair.id).id);
        return countResult[0].anzahl > 0;
    }

    @FieldResolver(is => BoothConnection, {
        description: '',
    })
    async booths(
        @Args() args: ConnectionArgs,
        @Root() fair: Fair
    ): Promise<BoothConnection> {
        args.validateArgs();
        const {type, id} = convertFromGlobalId(fair.id);
        const countResult = await getBoothByFairIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults =  await getBoothByFairIdPaginated(id, bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('booth', entity)
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo
        };
    }


    @FieldResolver(is => FairResourceConnection, {
        description: "The meeting resources at the fair.",
    })
    async resources(
        @Args() args: ConnectionArgs,
        @Root() fair: Fair,
        @Arg('filter', generateFilterType(FairResource)) filter: any
    ): Promise<FairResourceConnection> {
        args.validateArgs();
        const {type, id} = convertFromGlobalId(fair.id);
        const countResult = await getFairResourceByFairIdFilteredCount(id, filter);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getFairResourceByFairIdFilteredPaginated(id, filter, bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('fairresource', entity)
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo
        };
    }

    @FieldResolver(is => FairInfoConnection, {
        description: "The fair info elements that make up the fair booklet.",
    })
    async infos(
        @Args() args: ConnectionArgs,
        @Root() fair: Fair,
        @Arg('filter', generateFilterType(FairInfo)) filter: any
    ): Promise<FairInfoConnection> {
        args.validateArgs();

        const {type, id} = convertFromGlobalId(fair.id);
        const countResult = await getFairInfoByFairIdFilteredCount(id, filter);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getFairInfoByFairIdFilteredPaginated(id, filter, bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('fairinfo', entity)
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo
        };

    }

    @FieldResolver(is => FairProductConnection, {
        description: "The products that are available for order at the fair.",
    })
    async products(
        @Args() args: ConnectionArgs,
        @Root() fair: Fair
    ): Promise<FairProductConnection> {
        args.validateArgs();

        const {type, id} = convertFromGlobalId(fair.id);
        const countResult = await getFairProductByFairIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getFairProductByFairIdPaginated(id, bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('fairproduct', entity)
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo
        };

    }

    @FieldResolver(is => PrinterConnection, {
        description: "The printers available at the fair.",
    })
    async printers(
        @Args() args: ConnectionArgs,
        @Root() fair: Fair
    ): Promise<PrinterConnection> {
        args.validateArgs();

        const {type, id} = convertFromGlobalId(fair.id);
        const countResult = await getPrinterByFairIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getPrinterByFairIdPaginated(id, bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('printer', entity)
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo
        };
    }

    @FieldResolver(is => FairDeviceConnection, {
        description: "The fair devices associated with the fair.",
    })
    async fairDevices(
        @Args() args: ConnectionArgs,
        @Root() fair: Fair
    ): Promise<FairDeviceConnection> {
        args.validateArgs();

        const userIdMock = 'f6265805-0dab-4de0-9297-80ed6e916b44';
        const userId = userIdMock;  // TODO userId aus Kontext laden -> hier temp. Mock

        const {type, id} = convertFromGlobalId(fair.id);
        const countResult = await getFairDeviceByFairIdCount(id, userId);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getFairDeviceByFairIdPaginated(id, userId, bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('fairdevice', entity)
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo
        };
    }

    @FieldResolver(is => MeetingConnection, {
        description: "All meetings that are scheduled at the fair.",
    })
    async meetings(
        @Args() args: ConnectionArgs,
        @Root() fair: Fair,
        @Arg('filter', generateFilterType(Meeting)) filter: any
    ): Promise<MeetingConnection> {
        args.validateArgs();

        const {type, id} = convertFromGlobalId(fair.id);
        const countResult = await getMeetingByFairIdFilteredCount(id, filter);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getMeetingByFairIdFilteredPaginated(id, filter, bounds);
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

    @FieldResolver(is => StaffMemberConnection, {
        description: "The entire staff of the fair.",
    })
    async staff(
        @Args() args: ConnectionArgs,
        @Root() fair: Fair,
        @Info() info: GraphQLResolveInfo
    ): Promise<StaffMemberConnection> {
        args.validateArgs();

        const {type, id} = convertFromGlobalId(fair.id);
        const countResult = await getStaffMemberByFairIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getStaffMemberByFairIdPaginated(id,bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('staffmember', entity)
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo
        };
    }

    @FieldResolver(is => OrderConnection, {
        description: "Orders created at this fair.",
    })
    async orders(
        @Args() args: ConnectionArgs,
        @Root() fair: Fair
    ): Promise<OrderConnection> {
        args.validateArgs();

        const {type, id} = convertFromGlobalId(fair.id);
        const countResult = await getOrderByFairIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getOrderByFairIdPaginated(id,bounds);
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

