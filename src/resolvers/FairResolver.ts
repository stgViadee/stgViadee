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
import {StaffMemberFilter} from '../filter/StaffMemberFilter';

@Resolver((of) => Fair)
export class FairResolver {
    private fairs: Fair[] = [];

    @Query((returns) => [Fair], {nullable: true})
    async getFairs(): Promise<Fair[]> {
        this.fairs = await getAllFairs();
        return convertIdsToGlobalId('fair', this.fairs);
    }


    @Query((returns) => Fair, {nullable: true})
    async fair(@Arg('id') id: string): Promise<Maybe<Fair>> {
        this.fairs = await getFairById(convertFromGlobalId(id).id);
        return convertIdToGlobalId('fair', this.fairs[0]);
    }

    @FieldResolver(() => FairFeatures, {description: 'The feature set for this fair.'})
    async features(@Root() fair: Fair): Promise<FairFeatures> {
        return Object.assign(new FairFeatures(), fair.features);
    }

    @FieldResolver(is => User, {description: ''})
    @Loader<string, User>(async (ids) => {  // batchLoadFn
        var result = await getUsersByIdArray(ids);
        return convertIdsToGlobalId('user', result);
    })
    async author(@Root() fair: Fair) {
        return (dataloader: DataLoader<string, User>) =>
            dataloader.load(fair.author);
    }

    @FieldResolver(is => Organization, {description: ''})
    @Loader<string, Organization>(async (ids) => {  // batchLoadFn
        var result = await getOrganizationsByIdArray(ids);
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

        const {type, id} = convertFromGlobalId(fair.id);
        const countResult = await getFairDeviceByFairIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getFairDeviceByFairIdPaginated(id, bounds);
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

    // SELECT
    // "userProfile".*
    // FROM
    // fm."staffMember" INNER JOIN
    // fm."user"                   ON "staffMember"."user" = "user".id INNER JOIN
    // fm."userProfile"                    ON "user".id = "userProfile"."user"
    //
    // where "userProfile"."nameFirst" ilike '%ol%'

    // @FieldResolver(is => StaffMemberConnection, {
    //     description: "The entire staff of the fair.",
    // })
    // async staff(
    //     @Args() args: ConnectionArgs,
    //     @Args() filter: StaffMemberFilter,
    //     @Root() fair: Fair,
    //     @Info() info: GraphQLResolveInfo
    // ): Promise<StaffMemberConnection> {
    //     args.validateArgs();

    // SELECT
    // "userProfile".*
    // FROM
    // fm."staffMember" INNER JOIN
    // fm."user"                   ON "staffMember"."user" = "user".id INNER JOIN
    // fm."userProfile"                    ON "user".id = "userProfile"."user"
    //
    // where "userProfile"."nameFirst" ilike '%ol%'

    //     const makeStaffMemberQueryClause = (ids: Array<string>) => {
    //         const query: {
    //             attendance?: { start: { $gte: Date }; end: { $lte: Date } } | undefined;
    //             id: Array<string>;
    //             isAvailable?: boolean | undefined;
    //         } = {
    //             id: ids,
    //         };
    //
    //         if (filter.doesHave("isAttendingToday")) {
    //             const startOfDay = moment.tz(fair.timezone).startOf("day").toDate();
    //             const endOfDay = moment.tz(fair.timezone).endOf("day").toDate();
    //             query.attendance = { start: { $gte: startOfDay }, end: { $lte: endOfDay } };
    //         }
    //
    //         if (filter.doesHave("isAvailable")) {
    //             query.isAvailable = mustExist(filter.get("isAvailable"));
    //         }
    //
    //         return query;
    //     };
    //
    //     // Handle the case when a `search` was provided.
    //     // This is when a user wants to perform a freeform fulltext search through
    //     // profile data to find staff members.
    //     if (filter.doesHave("search")) {
    //         if (!filter.doesHave("locale")) {
    //             throw new InvalidArgumentError(
    //                 "If you want to search profiles, you need to specify a `locale`."
    //             );
    //         }
    //
    //         const spanSearch = context.openSpanAt("search", info.path);
    //         const results: Map<string, ElasticsearchHit> = await this._profileFairSearch.search({
    //             fairId: fair.id,
    //             inGroup: filter.get("inGroup", null),
    //             locale: filter.get("locale"),
    //             query: filter.get("search"),
    //             zipSearchCountry: filter.get("zipCountry"),
    //             searchColumns: filter.get("columns", null),
    //             sortColumn: pageAndFilter.sortColumn,
    //             sortDirection: pageAndFilter.sortDirection,
    //         });
    //         const matchedIds = Array.from(results.keys());
    //         spanSearch.finish();
    //
    //         const list: Array<StaffMember> = await Connection.resolveAsList(
    //             await context.messageContext.em.find(StaffMember, makeStaffMemberQueryClause(matchedIds)),
    //             matchedIds
    //         );
    //         const page = Connection.pageFromList(pageAndFilter, list);
    //         const pageInfo = Connection.getPageInfoFromList(pageAndFilter, list);
    //
    //         const searchResults = page.map(node => {
    //             const result = mustExist(results.get(node.id));
    //             const fields = Object.keys(result.highlight);
    //             const highlights = new Array<SearchHighlight>();
    //             for (const field of fields) {
    //                 const match = mustExist(result.highlight[field])[0];
    //                 highlights.push(new SearchHighlight(field, match));
    //             }
    //             return new StaffMemberSearchResult(node, highlights, result._source);
    //         });
    //         return StaffMemberSearchConnection.fromSubset({
    //             column: toEntityField(pageAndFilter.sortColumn) as keyof StaffMemberSearchResult,
    //             nodes: searchResults,
    //             ...pageInfo,
    //         });
    //     }
    //
    //     // If no search was provided, scan the entire index for all valid IDs.
    //     // We do this, instead of just selecting the staff members straight from
    //     // the database, to ensure results are sorted as expected.
    //     // This is a massive overhead, but is currently the only way to get
    //     // consistent results.
    //     const spanScan = context.openSpanAt("scan", info.path);
    //     const indexElements = await this._profileFairSearch.scan({
    //         fairId: fair.id,
    //         inGroup: filter.get("inGroup", null),
    //         locale: SupportedLocales.ENGLISH_UNITED_STATES,
    //         sortColumn: pageAndFilter.sortColumn,
    //         sortDirection: pageAndFilter.sortDirection,
    //     });
    //     spanScan.finish();
    //
    //     const batch = TaggedBatch.fromSubjects(indexElements, hit =>
    //         mustExist(hit._source.staffMemberId)
    //     );
    //     const staffMembers = await batch.load(
    //         ids => context.messageContext.em.find(StaffMember, makeStaffMemberQueryClause(ids)),
    //         staffMember => staffMember.id,
    //         LoaderBehavior.ErrorItem
    //     );
    //     const resultBatch: TaggedBatch<StaffMemberSearchResult> = await staffMembers.mapToBatch(
    //         staffMember => {
    //             const indexElement = mustExist(staffMembers.pullReferencedItem(batch, staffMember));
    //             return new StaffMemberSearchResult(staffMember, [], indexElement._source);
    //         }
    //     );
    //
    //     const results = await resultBatch.mapToResultsOptimistic(result => result);
    //     const page = Connection.pageFromList(pageAndFilter, results);
    //     const pageInfo = Connection.getPageInfoFromList(pageAndFilter, results);
    //
    //     return StaffMemberSearchConnection.fromSubset({
    //         column: toEntityField(pageAndFilter.sortColumn) as keyof StaffMemberSearchResult,
    //         nodes: page,
    //         ...pageInfo,
    //     });
    // }

    // @Authorized()
    // @FieldResolver(is => OrderConnection, {
    //     description: "Orders created at this fair.",
    // })
    // async orders(
    //     @Args() pageAndFilter: PageArguments,
    //     @Root() fair: Fair,
    //     @Ctx() context: ApolloContextAuthenticated
    // ): Promise<OrderConnection> {
    //     await this._safeguardPageArguments(pageAndFilter);
    //
    //     // We want all orders that are created at this fair.
    //     const queryClause: {
    //         fair: string;
    //     } = {
    //         fair: fair.id,
    //     };
    //
    //     const repoTools = new PaginationHelper(context.messageContext.em);
    //
    //     const nodes = await repoTools.resolvePage(Order, queryClause, pageAndFilter);
    //     const pageInfo = await repoTools.getPageInfo(Order, queryClause, pageAndFilter, nodes);
    //
    //     return OrderConnection.fromSubset({ pageRequest: pageAndFilter, nodes, ...pageInfo });
    // }
    // //#endregion
}

