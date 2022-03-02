import {Resolver, FieldResolver, Root, Query, ID, Arg, Args} from 'type-graphql';
import {Fair} from '../schemas/Fair';
import {getFairById} from '../queries/FairQueries';
import {convertFromGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {FairProduct} from '../schemas/FairProduct';
import {Product} from '../schemas/Product';
import {getProductById} from '../queries/ProductQueries';
import {ConnectionArgs} from '../schemas/relay/ConnectionArgs';
import {offsetToCursor} from 'graphql-relay';
import {FairProductAvailabilityConnection} from '../schemas/FairProductAvailabilityConnection';
import {
    getFairProductAvailabilitiesByFairProductIdCount,
    getFairProductAvailabilitiesByFairProductIdPaginated
} from '../queries/FairProductAvailabilityQueries';
import {getFairProductById} from '../queries/FairProductQueries';
import {GraphQLString} from 'graphql';

@Resolver((of) => FairProduct)
export class FairProductResolver {

    @FieldResolver(is => Fair, {description: ''})
    async fair(@Root() fairProduct: FairProduct): Promise<Fair> {
        const fairs = await getFairById(fairProduct.fair);
        return convertIdToGlobalId('fair', fairs[0]);
    }

    @FieldResolver(is => Product, {description: ''})
    async product(@Root() fairProduct: FairProduct): Promise<Product> {
        const products = await getProductById(fairProduct.product);
        return convertIdToGlobalId('product', products[0]);
    }

    @FieldResolver(is => GraphQLString, {description: ''})
    async size(@Root() fairProduct: FairProduct): Promise<string> {
        const products = await getFairProductById(convertFromGlobalId(fairProduct.id).id);

        if (products[0] && products[0].size){
            return products[0].size;
        }

        return "";
    }

    @FieldResolver(is => FairProductAvailabilityConnection)
    async availabilities(
        @Args() args: ConnectionArgs,
        @Root() fairProduct: FairProduct
    ): Promise<FairProductAvailabilityConnection> {

        args.validateArgs();

        const {type, id} = convertFromGlobalId(fairProduct.id);
        const countResult = await getFairProductAvailabilitiesByFairProductIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getFairProductAvailabilitiesByFairProductIdPaginated(id,  bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('fairProductAvailability', entity)
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo
        };

    }

}