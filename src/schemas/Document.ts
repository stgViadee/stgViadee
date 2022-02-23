import {Field, ID, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class Document {
    @Field(() => ID)
    id: string;

    @Field({nullable:true})
    hid: string;

    @Field()
    type: string;

    @Field()
    contentType: string;

    @Field()
    bucket: string;

    @Field()
    path: string;

    @Field()
    key: string;

    @Field()
    added: Date;

    @Field()
    changed: Date;

}