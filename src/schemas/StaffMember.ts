import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class StaffMember {

    @Field()
    id: string;

    @Field()
    primaryBooth: string;

    @Field()
    isAvailable: boolean;

    @Field({nullable: true})
    back: Date;

    @Field({nullable: true})
    reason: string;

    @Field({nullable: true})
    currentBooth: string;

    @Field()
    fair: string;

    @Field({nullable: true})
    user: string;

    @Field({nullable: true})
    added: Date;

    @Field({nullable: true})
    changed: Date;

    @Field({nullable: true})
    hid: string;
}