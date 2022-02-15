import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Guest {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field({nullable: true})
    meeting: string;
}