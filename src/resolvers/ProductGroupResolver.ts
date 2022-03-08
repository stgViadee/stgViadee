import {Resolver, FieldResolver, Root, Args} from 'type-graphql';
import {Organization} from '../schemas/Organization';
import {ConnectionArgs} from '../schemas/relay/ConnectionArgs';
import {offsetToCursor} from 'graphql-relay';
import {getOrganizationById} from '../queries/OrganizationQueries';
import {convertFromGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {ProductGroup} from '../schemas/ProductGroup';
import {ProductConnection} from '../schemas/ProductConnection';
import {getProductByProductGroupIdCount, getProductByProductGroupIdPaginated} from '../queries/ProductQueries';

@Resolver((of) => ProductGroup)
export class ProductGroupResolver {

    @FieldResolver(is => Organization, {description: "The organization that owns this product group."})
    async organization(@Root() productGroup: ProductGroup): Promise<Organization> {
        const organizations = await getOrganizationById(productGroup.organization);
        return convertIdToGlobalId('organization', organizations[0]);
    }

    @FieldResolver(is => ProductConnection, {description: "The products in this group."})
    async products(@Args() args: ConnectionArgs, @Root() productGroup: ProductGroup): Promise<ProductConnection> {
        args.validateArgs();
        const countResult = await getProductByProductGroupIdCount(convertFromGlobalId(productGroup.id).id);
        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getProductByProductGroupIdPaginated(convertFromGlobalId(productGroup.id).id, bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('product', entity)
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo
        };

    }

}