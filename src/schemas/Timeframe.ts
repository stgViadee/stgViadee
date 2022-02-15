import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Timeframe {

    @Field()
    id: string;

    @Field()
    start: Date;

    @Field()
    end: Date;

    @Field({nullable: true})
    staffMember: string;
}