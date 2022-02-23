import {Field, ID, ObjectType} from 'type-graphql';
import {User} from './User';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class Meeting {
    @Field(() => ID)
    id: string;

    @Field()
    start: Date;

    @Field()
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

    @Field()
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
}