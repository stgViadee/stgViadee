import {Resolver, FieldResolver, Root, Query, ID, Arg, Args, Int} from 'type-graphql';
import {Fair} from '../schemas/Fair';
import {getFairById} from '../queries/FairQueries';
import {convertFromGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {FairProduct} from '../schemas/FairProduct';
import {ConnectionArgs} from '../schemas/relay/ConnectionArgs';
import {offsetToCursor} from 'graphql-relay';
import {FairResource} from '../schemas/FairResource';
import {MeetingConnection} from '../schemas/MeetingConnection';
import {
    getMeetingByResouceIdCount, getMeetingByResourceIdPaginated
} from '../queries/MeetingQueries';
import {FairResolver} from './FairResolver';

@Resolver((of) => FairResource)
export class FairResourceResolver {

    @FieldResolver(is => Int, {
        description: "How many people can use this resource at the same time?",
    })
    async capacity(@Root() fairResource: FairResource): Promise<number> {
        return fairResource.capacity ?? 0;
    }
    
    @FieldResolver(is => Fair, {description: ''})
    async fair(@Root() fairResource: FairResource): Promise<Fair> {
        const fairs = await getFairById(fairResource.fair);
        return convertIdToGlobalId('fair', fairs[0]);
    }

    @FieldResolver(is => String, {
        description: "Where is this resource located?",
    })
    async location(@Root() fairResource: FairResource): Promise<string> {
        return fairResource.location ?? "";
    }

    @FieldResolver(is => MeetingConnection, {
        description: "All meetings that are scheduled at the fair.",
    })
    async meetings(
        @Args() args: ConnectionArgs,
        @Root() fairResource: FairResource
    ): Promise<MeetingConnection> {
        args.validateArgs();

        const {type, id} = convertFromGlobalId(fairResource.id);
        const countResult = await getMeetingByResouceIdCount(id,);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getMeetingByResourceIdPaginated(id,bounds);
        const edges = paginatedResults.map((entity, index) => ({
            cursor: offsetToCursor(bounds.startOffset + index),
            node: convertIdToGlobalId('meeting', entity)
        }));

        const pageInfo = args.compilePageInfo(edges, totalCount, bounds);
        return {
            edges,
            pageInfo
        };
    }

}