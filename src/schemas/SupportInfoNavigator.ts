import * as GraphQL from "type-graphql";
import {Field, ObjectType} from 'type-graphql';

@ObjectType({
    description: "Information about the web view used in the app.",
})
export class SupportInfoNavigator {
    @Field(is => Boolean, {
        description: "Are cookies enabled in the navigator?",
    })
    cookieEnabled = false;

    @Field(is => String, {
        description: "The language of the navigator.",
    })
    language = "";

    @Field(is => String)
    platform = "";

    @Field(is => String, {
        description: "The user-agent string as provided by the navigator.",
    })
    userAgent = "";
}
