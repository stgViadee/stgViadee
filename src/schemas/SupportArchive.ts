import { SupportInfoCordova } from "./SupportInfoCordova";
import { SupportInfoDevice } from "./SupportInfoDevice";
import { SupportInfoNavigator } from "./SupportInfoNavigator";
import { SupportInfoPlatform } from "./SupportInfoPlatform";
import {Field, Int, ObjectType} from 'type-graphql';

@ObjectType()
export class SupportArchive {
    @Field(is => Int)
    v = 2;

    @Field(is => Date)
    created = new Date();

    @Field(is => String)
    version = "";

    @Field(is => Boolean)
    versionIsCurrent?: boolean = undefined;

    @Field(is => SupportInfoCordova)
    cordova? = new SupportInfoCordova();

    @Field(is => SupportInfoDevice)
    device? = new SupportInfoDevice();

    @Field(is => SupportInfoNavigator)
    navigator? = new SupportInfoNavigator();

    @Field(is => SupportInfoPlatform)
    platform? = new SupportInfoPlatform();
}
