import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class CoveredRooms {
    @Field()
    id: string;

    @Field()
    printer: string;

    @Field()
    fairResource: string;

}