import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class PrinterResponsibilities {
    @Field()
    id: string;

    @Field()
    printer: string;

    @Field()
    productGroup: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;
}