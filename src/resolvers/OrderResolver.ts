import {Args, FieldResolver, Resolver, Root} from 'type-graphql';
import {convertFromGlobalId, convertIdsToGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {Order} from '../schemas/Order';
import {SerializedOrderPosition} from '../schemas/SerializedOrderPosition';
import {getOrderPositionByOrderId} from '../queries/OrderQueries';
import {Fair} from '../schemas/Fair';
import {getFairById} from '../queries/FairQueries';
import {User} from '../schemas/User';
import {Organization} from '../schemas/Organization';
import {getUserById} from '../queries/UserQueries';
import {ConnectionArgs} from '../schemas/relay/ConnectionArgs';
import {offsetToCursor} from 'graphql-relay';
import {PrintJobConnection} from '../schemas/PrintJobConnection';
import {getPrintJobByOrderIdCount, getPrintJobByOrderIdPaginated} from '../queries/PrintJobQueries';
import {compileConnection} from '../schemas/relay/ConnectionBuilder';

@Resolver(of => Order)
export class OrderResolver {


    @FieldResolver(is => [SerializedOrderPosition], )
    async positions(@Root() order: Order): Promise<SerializedOrderPosition[]> {
        let result = await getOrderPositionByOrderId(convertFromGlobalId(order.id).id);
        return convertIdsToGlobalId('serializedOrderPosition', result[0].positions.data);
    }

    @FieldResolver(is => Fair, {description: ''})
    async fair(@Root() order: Order): Promise<Fair> {
        const fairs = await getFairById(order.fair)
        return convertIdToGlobalId( 'fair', fairs[0]);
    }

    @FieldResolver(is => User, {description: ''})
    async author(@Root() order: Order): Promise<User> {
        const users = await getUserById(order.author)
        return convertIdToGlobalId('user', users[0]);
    }

    @FieldResolver(is => User, {description: ''})
    async recipient(@Root() order: Order): Promise<User> {
        const users = await getUserById(order.recipient);
        return convertIdToGlobalId('user', users[0]);
    }

    @FieldResolver(is => PrintJobConnection, {
        description: 'All print jobs that were generated for this order.',
    })
    async printJobs(
        @Args() args: ConnectionArgs,
        @Root() order: Order
    ): Promise<PrintJobConnection> {
        args.validateArgs();
        const {type, id} = convertFromGlobalId(order.id);
        const countResult = await getPrintJobByOrderIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults =  await getPrintJobByOrderIdPaginated(id, bounds);
        return compileConnection('printJob', paginatedResults, bounds, args, totalCount);
    }


}
