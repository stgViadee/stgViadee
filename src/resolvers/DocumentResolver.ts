import {Query, Resolver, Args, Ctx} from 'type-graphql';
import db, {sql} from '../dbconfig/dbconfig';
import {ConnectionArgs} from '../schemas/relay/ConnectionArgs';
import {getOffsetWithDefault, offsetToCursor} from 'graphql-relay';
import {DocumentConnection} from '../schemas/DocumentConnection';
import {Document} from '../schemas/Document';
import {getDocumentsByFileStoreByUserIdCount, getDocumentsByFileStoreByUserPaginated} from '../queries/DocumentQueries';

@Resolver((of) => Document)
export class DocumentResolver {

    private paginatedResults: Document[] = [];

    @Query((returns) => DocumentConnection, {nullable: true})
    async documents(@Args() args: ConnectionArgs): Promise<DocumentConnection> {
        args.validateArgs();
        const userId = ""; // TODO an dieser Stelle muss der User noch aus dem Kontext befüllt werden
        const countResult = await getDocumentsByFileStoreByUserIdCount(userId);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        this.paginatedResults = await getDocumentsByFileStoreByUserPaginated(userId, bounds);
        const edges = this.paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: entity
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo
        };
    }

}