import {Arg, FieldResolver, Maybe, Query, Resolver, Root} from 'type-graphql';
import {Booth} from '../schemas/Booth';
import {Fair} from '../schemas/Fair';
import {getFairById} from '../queries/FairQueries';
import {getAllBooths, getBoothById} from '../queries/BoothQueries';
import {convertFromGlobalId, convertIdsToGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';

@Resolver((of) => Booth)
export class BoothResolver {
    private booths: Booth[] = []
    private fairs: Fair[] = []

    @Query((returns) => [Booth], { nullable: true })
    async getBooths(): Promise<Booth[]> {
        this.booths = await getAllBooths();
        return convertIdsToGlobalId('booth', this.booths);
    }

    @Query((returns) => Booth, { nullable: true })
    async booth(@Arg("id") boothId : string): Promise<any[]> {
        this.booths = await getBoothById(convertFromGlobalId(boothId).id);
        return convertIdToGlobalId('booth', this.booths[0]);
    }

    @FieldResolver(is => Fair, {description: ''})
    async fair(@Root() booth: Booth): Promise<Fair> {
        this.fairs = await getFairById(booth.fair)
        return convertIdToGlobalId( 'booth', this.fairs[0]);
    }

}