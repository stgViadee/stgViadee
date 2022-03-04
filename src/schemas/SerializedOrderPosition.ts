import * as Validate from "class-validator";
import { stripIndent } from "common-tags";

import {Field, ID, InputType, Int, ObjectType} from 'type-graphql';

@ObjectType({
    description: "A hint about a product group that was used in an order.",
})
export class SerializedProductGroup {
    @Field(is => String, {
        description: "The ID the product group had when the order was placed.",
    })
    id!: string;

    @Field(is => String, {
        description: "The name the product group had when the order was placed.",
    })
    name!: string;
}

@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
export class SerializedOrderPositionBase {
    @Field(is => String, {
        description: "A note that could have been added to the position.",
        nullable: true,
    })
    @Validate.IsString()
    @Validate.MaxLength(200)
    note?: string;

    @Field(is => Int, {
        description: "How many items were ordered?",
    })
    @Validate.IsPositive()
    @Validate.IsInt()
    count!: number;

    @Field(is => String, {
        description: stripIndent`
    The name that was given for the customer who the position was ordered
    for.
    `,
        nullable: true,
    })
    customer?: string;
}

@InputType({
    description: "The individual positions of an order.",
})
export class SerializedOrderPositionInput extends SerializedOrderPositionBase {
    @Field(is => ID, {
        description: "The ID the `FairProduct` this position refers to.",
    })
    @Validate.IsBase64()
    fairProductId!: string;

    @Field(is => ID, {
        description: "The ID of the product group this position is from.",
    })
    @Validate.IsBase64()
    productGroupId!: string;
}

@ObjectType({
    description: "The individual positions of an order.",
})
export class SerializedOrderPosition extends SerializedOrderPositionBase {
    @Field(is => ID, {
        description: "The ID the `Product` had when the order was placed.",
    })
    @Validate.IsBase64()
    id!: string;

    @Field(is => SerializedProductGroup, {
        description: stripIndent`
    A hint about the product group when the ordered was placed.
    `,
    })
    @Validate.ValidateNested()
    productGroup!: SerializedProductGroup;

    @Field(is => String, {
        description: "The name the `Product` had when the order was placed.",
        nullable: true
    })
    name!: string;

    @Field(is => Number, {
        description: "The price the `Product` had when the order was placed.",
        nullable: true
    })
    @Validate.IsNumber()
    @Validate.Min(0)
    price?: number;

    @Field(is => String, {
        description: "The size the `Product` had when the order was placed.",
        nullable: true,
    })
    size?: string;
}


