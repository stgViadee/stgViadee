import {Field, ID, ObjectType} from 'type-graphql';
import {Meeting} from './Meeting';
import {User} from './User';

@ObjectType()
export class Attendance {
    @Field(() => ID)
    id: string;

    @Field(() => Meeting)
    meeting: string;

    @Field(() => User, {nullable: true})
    user: string;
}