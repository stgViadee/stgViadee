import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';
import {Printer} from './Printer';
import {Filter} from 'type-graphql-filter';
import {Order} from './Order';

@ObjectType( { implements: Node} )
export class PrintJob {

    @Field(() => ID)
    id: string;

    @Field({nullable:true})
    hid: string;

    @Field()
    content: string;

    @Field(() => Order, {nullable:true})
    order: string;

    @Field(() => Printer, {nullable:true})
    @Filter(['eq', 'in'])
    printer: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

}