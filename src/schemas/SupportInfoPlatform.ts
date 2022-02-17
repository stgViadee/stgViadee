import {Field, ObjectType} from 'type-graphql';

@ObjectType({
    description: "Information about the platform (OS), the app is running on.",
})
export class SupportInfoPlatform {
    @Field(is => String, {
        description: "The device platform. For example: android, ios, ...",
    })
    name = "";

    @Field(is => String, {
        description: "The version of the platform being used.",
    })
    version = "";
}