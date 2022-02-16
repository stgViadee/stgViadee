import {Field, ObjectType} from 'type-graphql';
import {User} from './User';

@ObjectType()
export class Fair {
    @Field()
    id: string;

    @Field({nullable:true})
    hid: string;

    @Field({nullable:true})
    name: string;

    @Field({nullable:true})
    timezone: string;

    @Field(() => User)
    author: User;

    @Field({nullable:true})
    feature: string;

    @Field()
    organization: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

}