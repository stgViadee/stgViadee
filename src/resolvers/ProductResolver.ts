import {Resolver, FieldResolver, Root, Args} from 'type-graphql';
import {ProductGroup} from '../schemas/ProductGroup';
import {Product} from '../schemas/Product';
import {Loader} from 'type-graphql-dataloader';
import {convertIdsToGlobalId} from '../schemas/relay/GlobalIdHandler';
import DataLoader from 'dataloader';
import {getProductGroupsByIdArray} from '../queries/ProductGroupQueries';

@Resolver((of) => Product)
export class ProductResolver {

    @FieldResolver(is => ProductGroup, {
        description: "The group for this product.",
    })
    @Loader<string, ProductGroup>(async (ids) => {  // batchLoadFn
        let result = await getProductGroupsByIdArray(ids);
        return convertIdsToGlobalId('productGroup', result);
    })
    async productGroup(@Root() product: Product) {
        return (dataloader: DataLoader<string, ProductGroup>) =>
            dataloader.load(product.productGroup);
    }
}