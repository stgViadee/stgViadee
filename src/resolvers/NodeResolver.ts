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
import {Fair} from '../schemas/Fair';
import {fromGlobalId, toGlobalId} from 'graphql-relay';
import {getUserById} from '../queries/UserQueries';
import {User} from '../schemas/User';
import {encode} from 'slugid';

@Resolver(() => Node)
export class NodeResolver {

    private nodeResult: Node[] = [];
    private fairResult: Fair[] = [];
    private userResult: User[] = [];

    @FieldResolver()
    globalId(
        @Root() { id }: { id: string },
        @Info() { parentType: { name } }: { parentType: { name: string } }
    ): string {
        console.log("Hier laufen wird durch " + name);
        return convertIdToGlobalId(name, id);
    }

    private async load(
        globalId: string
    ): Promise<Node | undefined> {
        const {type, id} = convertFromGlobalId(globalId)
        console.log(type)
        console.log(id)


        if (type === 'fair') {
            this.fairResult = await getFairById(id);
            return convertIdToGlobalId('fair', this.fairResult[0]);
        }
        if (type === 'user') {
            this.userResult = await getUserById(id);
            return convertIdToGlobalId('user', this.userResult[0]);
        }

        return this.nodeResult[0];
    }

    // TODO: DataLoader
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
