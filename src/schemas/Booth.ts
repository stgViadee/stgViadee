import {Field, ID, ObjectType} from 'type-graphql';
import {Fair} from './Fair';

@ObjectType()
export class Booth {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field(() => Fair)
    fair: string;

    @Field({nullable: true})
    hall: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

    @Field({nullable: true})
    hid: string;
}