import * as Relay from 'graphql-relay';
import {Field, ArgsType, Maybe} from 'type-graphql';
import {getOffsetWithDefault} from 'graphql-relay';

@ArgsType()
export class ConnectionArgs implements Relay.ConnectionArguments {
    @Field((type) => String, {
        nullable: true,
        description: 'Paginate before opaque cursor',
    })
    before?: Relay.ConnectionCursor;

    @Field((type) => String, {
        nullable: true,
        description: 'Paginate after opaque cursor',
    })
    after?: Relay.ConnectionCursor;

    @Field((type) => Number, {nullable: true, description: 'Paginate first'})
    first?: number;

    @Field((type) => Number, {nullable: true, description: 'Paginate last'})
    last?: number;

    public validateArgs(): void {
        if (this.first && this.last) {
            throw new Error('Cannot use \'first\' and \'last\' simultaneously!');
        }
        if (this.before && this.after) {
            throw new Error('Cannot use \'before\' and \'after\' simultaneously!');
        }
    }

    public calculateBounds(totalCount: number,): { beforeOffset: number; endOffset: number; startOffset: number; offset: number; limit: number; afterOffset: number } {
        // offsets
        const beforeOffset = getOffsetWithDefault(this.before, totalCount);
        const afterOffset = getOffsetWithDefault(this.after, -1);

        let startOffset = Math.max(-1, afterOffset) + 1;
        let endOffset = Math.min(beforeOffset, totalCount);

        if (this.first) {
            endOffset = Math.min(endOffset, startOffset + this.first);
        }

        if (this.last) {
            startOffset = Math.max(startOffset, endOffset - this.last);
        }

        // skip, take
        const offset = Math.max(startOffset, 0); // sql offset
        const limit = Math.max(endOffset - startOffset, 1); // sql limit

        return {
            offset,
            limit,
            beforeOffset,
            afterOffset,
            startOffset,
            endOffset
        };
    }


    compilePageInfo(edges: { cursor: string; node: any }[], totalCount: number, bounds: { beforeOffset: number; endOffset: number; startOffset: number; offset: number; limit: number; afterOffset: number }) {
        // page info
        const {length, 0: firstEdge, [length - 1]: lastEdge} = edges;
        const lowerBound = this.after ? bounds.afterOffset + 1 : 0;
        const upperBound = this.before ? Math.min(bounds.beforeOffset, totalCount) : totalCount;

        return {
            startCursor: firstEdge ? firstEdge.cursor : null,
            endCursor: lastEdge ? lastEdge.cursor : null,
            hasPreviousPage: this.last ? bounds.startOffset > lowerBound : false,
            hasNextPage: this.first ? bounds.endOffset < upperBound : false
        };
    }
}