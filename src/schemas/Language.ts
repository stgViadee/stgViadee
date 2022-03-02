import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class Language {
    @Field(() => ID)
    id: string;

    @Field({nullable:true})
    hid: string;

    @Field()
    code: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;
}