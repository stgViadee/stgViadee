import {Query, Resolver, Args, Ctx} from 'type-graphql';
import {ConnectionArgs} from '../schemas/relay/ConnectionArgs';
import {offsetToCursor} from 'graphql-relay';
import {DocumentConnection} from '../schemas/DocumentConnection';
import {Document} from '../schemas/Document';
import {getDocumentsByFileStoreByUserIdCount, getDocumentsByFileStoreByUserPaginated} from '../queries/DocumentQueries';
import {convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';

@Resolver((of) => Document)
export class DocumentResolver {

    @Query((returns) => DocumentConnection, {nullable: true})
    async documents(@Args() args: ConnectionArgs): Promise<DocumentConnection> {
        args.validateArgs();
        const userIdMock = 'f6265805-0dab-4de0-9297-80ed6e916b44';
        const userId = userIdMock;  // TODO userId aus Kontext laden -> hier temp. Mock
        const countResult = await getDocumentsByFileStoreByUserIdCount(userId);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getDocumentsByFileStoreByUserPaginated(userId, bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('document', entity)
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