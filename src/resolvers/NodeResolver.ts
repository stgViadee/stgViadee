import {NodeInterface} from '../schemas/NodeInterface';
import {Arg, FieldResolver, ID, Info, Query, Resolver, Root} from 'type-graphql';

import {getUserById} from '../queries/UserQueries';
import {convertFromGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {getFairById} from '../queries/FairQueries';

@Resolver(() => NodeInterface)
export class NodeResolver {
    private result : any[] = [];

    @FieldResolver()
    id(@Root() { id }: any, @Info() {parentType: {name}}: { parentType: { name: string } }): string {
        console.log("Wir erreichen diesen Code");
        return convertIdToGlobalId(name, id);
    }
    @Query(returns => NodeInterface, {description:
            'Returns an arbitrary node from the graph.'

    })
    async node(
        @Arg('id', is => ID) globalId: string
    ): Promise<NodeInterface> {
        console.log("Wir erreichen diesen Code");
        const {type, id} = convertFromGlobalId(globalId);

        const node = await getUserById(id);
        if (type === 'fair') {
            this.result = await getFairById(id);
        }

        return this.result[0];
    }


}