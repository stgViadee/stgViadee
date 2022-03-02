import {Query, Resolver} from 'type-graphql';
import {convertIdsToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {Language} from '../schemas/Language';
import {getAllLanguages} from '../queries/LanguageQueries';

@Resolver((of) => Language)
export class LanguageResolver {

    @Query((returns) => [Language], { nullable: true })
    async languages(): Promise<Language[]> {
        const languages = await getAllLanguages();
        return convertIdsToGlobalId('language', languages);
    }

}