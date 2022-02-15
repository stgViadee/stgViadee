import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class FairDay {
    @Field()
    id: string;

    @Field()
    open: Date;

    @Field()
    close: Date;

    @Field({nullable:true})
    fair: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

    @Field({nullable:true})
    hid: string;

}