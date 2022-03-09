import {Arg, Args, FieldResolver, Query, Resolver, Root} from 'type-graphql';
import {PrintJob} from '../schemas/PrintJob';
import {PrintJobConnection} from '../schemas/PrintJobConnection';
import {ConnectionArgs} from '../schemas/relay/ConnectionArgs';
import {
    convertFromGlobalId,
    convertFromGlobalIds,
    convertIdsToGlobalId
} from '../schemas/relay/GlobalIdHandler';
import {generateFilterType} from 'type-graphql-filter';
import {
    getPrintJobsByPrinterIdsCount, getPrintJobsByPrinterIdsPaginated
} from '../queries/PrintJobQueries';
import {Printer} from '../schemas/Printer';
import {Loader} from 'type-graphql-dataloader';
import DataLoader from 'dataloader';
import {getPrinterByIds} from '../queries/PrinterQueries';
import {Order} from '../schemas/Order';
import {getOrderByIds} from '../queries/OrderQueries';
import {compileConnection} from '../schemas/relay/ConnectionBuilder';

@Resolver((of) => PrintJob)
export class PrintJobResolver {

    @Query(returns => PrintJobConnection, {
        description: 'Find print jobs.',
    })
    async printJobs(
        @Args() args: ConnectionArgs,
        @Arg('filter', generateFilterType(PrintJob)) filter: any
    ): Promise<PrintJobConnection> {

        const userIdMock = 'f6265805-0dab-4de0-9297-80ed6e916b44';
        const userId = userIdMock;  // TODO userId aus Kontext laden -> hier temp. Mock


        if (filter.printer_eq && filter.printer_in) {
            throw new Error('The filters printer_eq and printer_in are mutually exclusive');
        }

        if (!filter.printer_eq && !filter.printer_in) {
            throw new Error('Either specify printer_eq or printer_in.');
        }

        let ids;
        if (filter.printer_eq) {
            ids = [convertFromGlobalId(filter.printer_eq).id];
        } else {
            ids = convertFromGlobalIds(filter.printer_in).map(item => item.id);
        }

        let countResult = await getPrintJobsByPrinterIdsCount(ids, userId);
        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        let paginatedResults = await getPrintJobsByPrinterIdsPaginated(ids, userId, bounds);
        return compileConnection('printJob', paginatedResults, bounds, args, totalCount);

    }

    @FieldResolver(is => Order, {description: "The order this print job was generated from."})
    @Loader<string, Order>(async (ids) => {  // batchLoadFn
        let result = await getOrderByIds(ids);
        return convertIdsToGlobalId('order', result);
    })
    async order(@Root() printJob: PrintJob) {
        return (dataloader: DataLoader<string, Order>) =>
            dataloader.load(printJob.order);
    }

    @FieldResolver(is => Printer, {description: "The printer to be used for this print job."})
    @Loader<string, Printer>(async (ids) => {  // batchLoadFn
        let result = await getPrinterByIds(ids);
        return convertIdsToGlobalId('printer', result);
    })
    async printer(@Root() printJob: PrintJob) {
        return (dataloader: DataLoader<string, Printer>) =>
            dataloader.load(printJob.printer);
    }
}