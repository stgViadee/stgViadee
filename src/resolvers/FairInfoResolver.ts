import {Resolver, FieldResolver, Root, Query, ID, Arg} from 'type-graphql';
import {Fair} from '../schemas/Fair';
import {getFairById} from '../queries/FairQueries';
import {convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {FairInfo} from '../schemas/FairInfo';

@Resolver((of) => FairInfo)
export class FairInfoResolver {

    @FieldResolver(is => Fair, {description: ''})
    async fair(@Root() fairInfo: FairInfo): Promise<Fair> {
        const fairs = await getFairById(fairInfo.fair);
        return convertIdToGlobalId('fair', fairs[0]);
    }

}