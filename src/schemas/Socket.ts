import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Socket {

    @Field()
    id: string;

    @Field()
    socketId: string;

    @Field()
    session: string;

    @Field({nullable: true})
    nodeId: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;
}