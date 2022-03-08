import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';
import {Printer} from './Printer';

@ObjectType( { implements: Node} )
export class PrintJob {

    @Field(() => ID)
    id: string;

    @Field({nullable:true})
    hid: string;

    @Field()
    content: string;

    @Field({nullable:true})
    order: string;

    @Field(() => Printer, {nullable:true})
    printer: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

}