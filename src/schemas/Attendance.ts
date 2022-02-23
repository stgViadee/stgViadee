import {Field, ID, ObjectType} from 'type-graphql';
import {Meeting} from './Meeting';
import {User} from './User';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class Attendance {
    @Field()
    id: string;

    @Field(() => Meeting)
    meeting: string;

    @Field(() => User, {nullable: true})
    user: string;
}