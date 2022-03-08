import {Field, GraphQLISODateTime, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';
import {Timeframe} from './Timeframe';
import {GraphQLBoolean} from 'graphql';
import {Filter} from 'type-graphql-filter';
import {User} from './User';
import {Fair} from './Fair';
import {Booth} from './Booth';

@ObjectType({implements: Node})
export class StaffMember {

    @Field(() => ID)
    id: string;

    @Field(() => Booth)
    primaryBooth: string;

    @Field()
    @Filter(['eq'], () => GraphQLBoolean)
    isAvailable: boolean;

    @Field({nullable: true})
    back: Date;

    @Field({nullable: true})
    reason: string;

    @Field(() => Booth, {nullable: true})
    currentBooth: string;

    @Field(() => Fair, {nullable: true})
    fair: string;

    @Field(() => User, {nullable: true})
    user: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

    @Field({nullable: true})
    hid: string;

    @Field(() => [Timeframe], {nullable: true})
    @Filter(['eq',], () => GraphQLBoolean)
    attendance: [Timeframe];

    @Filter(['gt', 'gte', 'lt', 'lte'], () => GraphQLISODateTime)
    start: Date;

    @Filter(['gt', 'gte', 'lt', 'lte'], () => GraphQLISODateTime)
    end: Date;
}