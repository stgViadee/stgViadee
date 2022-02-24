import {Resolver, FieldResolver, Root} from 'type-graphql';
import {Fair} from '../schemas/Fair';
import {FairDay} from '../schemas/FairDay';
import {getFairById} from '../queries/FairQueries';
import {convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';

@Resolver((of) => FairDay)
export class FairDayResolver {

    private fairs: Fair[] = [];

    @FieldResolver(is => Fair, {description: ''})
    async fair(@Root() fairDay: FairDay): Promise<Fair> {
        this.fairs = await getFairById(fairDay.fair);
        return convertIdToGlobalId('fair', this.fairs[0]);
    }

}