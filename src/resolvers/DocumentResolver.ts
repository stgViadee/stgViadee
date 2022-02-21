import {Query, Resolver, Args} from 'type-graphql';
import db, {sql} from '../dbconfig/dbconfig';
import {ConnectionArgs} from '../schemas/relay/ConnectionArgs';
import {getOffsetWithDefault, offsetToCursor} from 'graphql-relay';
import {DocumentConnection} from '../schemas/DocumentConnection';
import {Document} from '../schemas/Document';

@Resolver((of) => Document)
export class DocumentResolver {

    private paginatedResults: Document[] = [];

    @Query((returns) => DocumentConnection, {nullable: true})
    async documents(@Args() args: ConnectionArgs): Promise<DocumentConnection> {
        args.validateArgs();

        const countResult = await db.query(sql`
            select count(*) as anzahl from fm.document
        `);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        this.paginatedResults = await db.query(sql`
            select * from fm.document
            order by id asc
            LIMIT ${bounds.limit}
            OFFSET ${bounds.offset}
        `);

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