import {Field, ObjectType} from 'type-graphql';
import {Organization} from './Organization';

@ObjectType()
export class Company {
    @Field()
    id: string;

    @Field({nullable: true})
    hid: string;

    @Field()
    name: string;

    @Field(() => Organization)
    organization: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;
}