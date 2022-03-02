import {
    Arg,
    FieldResolver,
    ID,
    Info,
    Query,
    Resolver,
    Root
} from 'type-graphql'
import {getFairById} from '../queries/FairQueries';
import { Node } from '../schemas/Node'
import {convertFromGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {getUserById} from '../queries/UserQueries';

@Resolver(() => Node)
export class NodeResolver {

    @FieldResolver()
    globalId(
        @Root() { id }: { id: string },
        @Info() { parentType: { name } }: { parentType: { name: string } }
    ): string {
        return convertIdToGlobalId(name, id);
    }

    private async load(
        globalId: string
    ): Promise<Node | undefined> {
        const {type, id} = convertFromGlobalId(globalId)


        if (type === 'fair') {
            const fairResult = await getFairById(id);
            return convertIdToGlobalId('fair', fairResult[0]);
        }
        if (type === 'user') {
            const userResult = await getUserById(id);
            return convertIdToGlobalId('user', userResult[0]);
        }

        return null;
    }

    @Query(() => Node, {
        nullable: true,
        description: 'Fetches an object given its global ID.'
    })
    node(
        @Arg('id', () => ID, { description: 'The global ID of the object.' })
            globalId: string
    ): ReturnType<NodeResolver['load']> {
        return this.load(globalId)
    }

    @Query(() => [Node], {
        nullable: 'items',
        description: 'Fetches objects given their global IDs.'
    })
    nodes(
        @Arg('ids', () => [ID], { description: 'The global IDs of the objects.' })
            globalIds: Array<string>
    ): Array<ReturnType<NodeResolver['load']>> {
        return globalIds.map(id => this.load(id))
    }
}
