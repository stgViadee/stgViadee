import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Attendance {
    @Field()
    id: string;

    @Field()
    meeting: string;

    @Field({nullable: true})
    user: string;
}