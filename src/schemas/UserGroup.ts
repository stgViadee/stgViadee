import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class UserGroup {

    @Field()
    id: string;

    @Field({nullable:true})
    name: string;

    @Field()
    type: string;

    @Field()
    organization: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

    @Field({nullable:true})
    fair: string;
}