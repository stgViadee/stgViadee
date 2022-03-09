import {ArgsType, Field, ID} from 'type-graphql';
import {IsBase64} from 'class-validator';

@ArgsType()
export class FindByIdArguments {
    @Field(is => ID, {
        description: "The ID of the node.",
    })
    @IsBase64()
    id!: string;
}
