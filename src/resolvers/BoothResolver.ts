import {Arg, FieldResolver, Maybe, Query, Resolver, Root} from 'type-graphql';
import {Booth} from '../schemas/Booth';
import {Fair} from '../schemas/Fair';
import {getFairById} from '../queries/FairQueries';
import {getAllBooths, getBoothById} from '../queries/BoothQueries';
import {convertFromGlobalId, convertIdsToGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';

@Resolver((of) => Booth)
export class BoothResolver {

    @Query((returns) => [Booth], { nullable: true })
    async getBooths(): Promise<Booth[]> {
        const booths = await getAllBooths();
        return convertIdsToGlobalId('booth', booths);
    }

    @Query((returns) => Booth, { nullable: true })
    async booth(@Arg("id") boothId : string): Promise<any[]> {
        const booths = await getBoothById(convertFromGlobalId(boothId).id);
        return convertIdToGlobalId('booth', booths[0]);
    }

    @FieldResolver(is => Fair, {description: ''})
    async fair(@Root() booth: Booth): Promise<Fair> {
        const fairs = await getFairById(booth.fair)
        return convertIdToGlobalId( 'booth', fairs[0]);
    }

}