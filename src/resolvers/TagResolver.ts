import {FieldResolver, Resolver, Root} from 'type-graphql';
import {Organization} from '../schemas/Organization';
import {getOrganizationById} from '../queries/OrganizationQueries';
import {convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {Tag} from '../schemas/Tag';

@Resolver((of) => Tag)
export class TagResolver {

    @FieldResolver(is => Organization, {description: "The organization that owns this tag."})
    async organization(@Root() tag: Tag): Promise<Organization> {
        const organizations = await getOrganizationById(tag.organization);
        return convertIdToGlobalId('organization', organizations[0]);
    }
}