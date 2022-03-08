import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';
import {ProductGroup} from './ProductGroup';

@ObjectType( { implements: Node} )
export class PrinterResponsibilities {
    @Field()
    id: string;

    @Field()
    printer: string;

    @Field(() => ProductGroup)
    productGroup: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;
}