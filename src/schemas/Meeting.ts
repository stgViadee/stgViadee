import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Meeting {
    @Field()
    id: string;

    @Field()
    start: Date;

    @Field()
    end: Date;

    @Field()
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
    display: JSON;

    @Field()
    resource: string;

    @Field()
    organizer: string;

    @Field()
    requiresCatering: boolean;

    @Field({nullable: true})
    hid: string;

    @Field()
    added: Date;

    @Field()
    changed: Date;
}