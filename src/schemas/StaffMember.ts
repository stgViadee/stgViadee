import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';
import {Timeframe} from './Timeframe';
import {GraphQLBoolean} from 'graphql';
import {Filter} from 'type-graphql-filter';

@ObjectType( { implements: Node} )
export class StaffMember {

    @Field(() => ID)
    id: string;

    @Field()
    primaryBooth: string;

    @Field()
    @Filter(['eq'], () => GraphQLBoolean)
    isAvailable: boolean;

    @Field({nullable: true})
    back: Date;

    @Field({nullable: true})
    reason: string;

    @Field({nullable: true})
    currentBooth: string;

    @Field()
    fair: string;

    @Field({nullable: true})
    user: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

    @Field({nullable: true})
    hid: string;

    @Field( () => [Timeframe], {nullable : true})
    @Filter(['eq', ], () => GraphQLBoolean)
    attendance: [Timeframe]
}