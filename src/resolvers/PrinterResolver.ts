import {Arg, Args, FieldResolver, Info, Maybe, Query, Resolver, Root} from 'type-graphql';
import {convertFromGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {ConnectionArgs} from '../schemas/relay/ConnectionArgs';
import {offsetToCursor} from 'graphql-relay';
import {getFairById, getFairByIdForUserId} from '../queries/FairQueries';
import {Printer} from '../schemas/Printer';
import {PrinterConnection} from '../schemas/PrinterConnection';
import {generateFilterType} from 'type-graphql-filter';
import {getPrinterByFairIdCount, getPrinterByFairIdPaginated} from '../queries/PrinterQueries';
import {Device} from '../schemas/Device';
import {getDeviceById} from '../queries/DeviceQueries';
import {Fair} from '../schemas/Fair';
import {Booth} from '../schemas/Booth';
import {FairResourceConnection} from '../schemas/FairResourceConnection';
import {getCoveredRoomsByPrinterIdCount, getCoveredRoomsByPrinterIdPaginated} from '../queries/CoveredRoomsQueries';
import {ProductGroupConnection} from '../schemas/ProductGroupConnection';
import {getProductGroupByPrinterIdCount, getProductGroupByPrinterIdPaginated} from '../queries/ProductGroupQueries';
import {PrintJobConnection} from '../schemas/PrintJobConnection';
import {getPrintJobByPrinterIdCount, getPrintJobByPrinterIdPaginated} from '../queries/PrintJobQueries';

@Resolver((of) => Printer)
export class PrinterResolver {

    @Query(returns => PrinterConnection, {
        description: 'Finds all printers associated with the given fair.',
    })
    async printers(
        @Args() args: ConnectionArgs,
        @Arg('filter', generateFilterType(Printer)) filter: any
    ): Promise<PrinterConnection> {
        args.validateArgs();

        const userIdMock = 'f6265805-0dab-4de0-9297-80ed6e916b44';
        const userId = userIdMock;  // TODO userId aus Kontext laden -> hier temp. Mock

        const {type, id} = convertFromGlobalId(filter.fair_eq);

        const fairs = await getFairByIdForUserId(id, userId);
        if (fairs.length === 0) {
            throw new Error('You cannot inspect that fair.');
        }

        const countResult = await getPrinterByFairIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getPrinterByFairIdPaginated(id, bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('printer', entity)
        }));
        const nodes = edges.map(edge => edge.node);

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo,
            nodes
        };
    }

    @FieldResolver((returns) => Device, { nullable:true, description: 'The device this printer is associated with.' })
    async device(@Root() printer : Printer): Promise<Maybe<Device>> {
        const devices = await getDeviceById(printer.device);
        if (devices.length > 0) {
            return convertIdToGlobalId('device', devices[0]);
        }

        return null;
    }

    @FieldResolver(is => Fair, {description: ''})
    async fair(@Root() printer: Printer): Promise<Fair> {
        const fairs = await getFairById(printer.fair)
        return convertIdToGlobalId( 'fair', fairs[0]);
    }

    @FieldResolver(is => FairResourceConnection, {
        description: 'If declared, this printer will only print orders that are to be delivered to these resources.'
    })
    async coveredRooms(
        @Args() args: ConnectionArgs,
        @Root() printer: Printer
    ): Promise<FairResourceConnection> {

        const {type, id} = convertFromGlobalId(printer.id);

        const countResult = await getCoveredRoomsByPrinterIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getCoveredRoomsByPrinterIdPaginated(id, bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('fairResource', entity)
        }));
        const nodes = edges.map(edge => edge.node);

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo,
            nodes
        };
    }

    @FieldResolver(is => ProductGroupConnection, {
        description: 'If declared, this printer will only print parts of orders for which it is responsible. Other items from the order must be printed on other printers, or the entire order is not printed.'
    })
    async responsibilities(
        @Args() args: ConnectionArgs,
        @Root() printer: Printer
    ): Promise<ProductGroupConnection> {
        const {type, id} = convertFromGlobalId(printer.id);

        const countResult = await getProductGroupByPrinterIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getProductGroupByPrinterIdPaginated(id, bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('productGroup', entity)
        }));
        const nodes = edges.map(edge => edge.node);

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo,
            nodes
        };
    }

    @FieldResolver(is => PrintJobConnection, {
        description: 'All print jobs that this printer should be printing.'
    })
    async printJobs(
        @Args() args: ConnectionArgs,
        @Root() printer: Printer
    ): Promise<PrintJobConnection> {

        const {type, id} = convertFromGlobalId(printer.id);

        const countResult = await getPrintJobByPrinterIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getPrintJobByPrinterIdPaginated(id, bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('printJob', entity)
        }));
        const nodes = edges.map(edge => edge.node);

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo,
            nodes
        };

    }

}