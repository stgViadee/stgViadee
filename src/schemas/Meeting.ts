import {Field, GraphQLISODateTime, ID, ObjectType} from 'type-graphql';
import {User} from './User';
import {Node} from './Node';
import {Filter} from 'type-graphql-filter';
import {FairResource} from './FairResource';
import {Guest} from './Guest';

@ObjectType( { implements: Node} )
export class Meeting {
    @Field(() => ID)
    id: string;

    @Field()
    @Filter(['gt', 'gte', 'lt', 'lte'], () => GraphQLISODateTime)
    start: Date;

    @Field()
    @Filter(['gt', 'gte', 'lt', 'lte'], () => GraphQLISODateTime)
    end: Date;

    @Field({nullable:true})
    title: string;

    @Field()
    isIcalUpdatePending: boolean;

    @Field()
    sequenceCount: number;

    @Field()
    noted: string;

    @Field()
    color: string;

    @Field({nullable: true})
    display: string;

    @Field(() => FairResource)
    resource: string;

    @Field(() => User, {nullable:true})
    organizer: string;

    @Field()
    requiresCatering: boolean;

    @Field({nullable: true})
    hid: string;

    @Field()
    added: Date;

    @Field()
    changed: Date;

    @Field(() => [User], {nullable:true})
    attendees: [User];

    @Field(() => [Guest], {nullable:true})
    guests: [Guest];
}