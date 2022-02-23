import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
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