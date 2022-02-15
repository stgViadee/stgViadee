import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class FileStore {
    @Field()
    id: string;

    @Field()
    user: string;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

    @Field({nullable:true})
    hid: string;
}