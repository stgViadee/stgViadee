import {ConnectionArgs} from './ConnectionArgs';
import {offsetToCursor} from 'graphql-relay';
import {convertIdToGlobalId} from './GlobalIdHandler';

export function compileConnection(type: string, paginatedResults: any[], bounds: { beforeOffset: number; endOffset: number; startOffset: number; offset: number; limit: number; afterOffset: number }, args: ConnectionArgs, totalCount) {
    const edges = paginatedResults.map((entity, index) => ({
        cursor: offsetToCursor(bounds.startOffset + index),
        node: convertIdToGlobalId(type, entity)
    }));
    const nodes = edges.map(edge => edge.node);

    const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
    return {
        edges,
        pageInfo,
        nodes,
        totalCount
    };
}