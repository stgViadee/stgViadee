import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Credit {
    @Field()
    id: string;

    @Field({nullable: true})
    hid: string;

    @Field()
    organization: string;

    @Field({nullable: true})
    balanceChange: number;

    @Field({nullable: true})
    meta: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;
}