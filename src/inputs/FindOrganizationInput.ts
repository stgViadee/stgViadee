import {Field, ID, InputType} from 'type-graphql';
import {IsBase64, IsOptional, Length} from 'class-validator';

@InputType()
export class FindOrganizationInput {
    @Field(is => ID, {
        description: "The ID of a specific node.",
        nullable: true,
    })
    @IsOptional()
    @IsBase64()
    id?: string;

    @Field(is => String, {
        description: "A string to search for in the name of organizations.",
    })
    @IsOptional()
    @Length(1, 100)
    name?: string;
}
