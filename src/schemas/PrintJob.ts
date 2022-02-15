import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class PrintJob {

    @Field()
    id: string;

    @Field({nullable:true})
    hid: string;

    @Field()
    content: string;

    @Field({nullable:true})
    order: string;

    @Field({nullable:true})
    printer: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

}