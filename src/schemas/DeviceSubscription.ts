import * as Validate from "class-validator";
import {Field, InputType, ObjectType} from 'type-graphql';

@ObjectType()
export class DeviceSubscriptions {
    @Field(is => Boolean, {
        description: "Reminders about a set return time.",
        defaultValue: true,
    })
    @Validate.IsBoolean()
    returnToBooth = true;

    @Field(is => Boolean, {
        description: "Reminder to sign in in the morning.",
        defaultValue: true,
    })
    @Validate.IsBoolean()
    signInAtBooth = true;

    @Field(is => Boolean, {
        description: "Reminder about an upcoming meeting.",
        defaultValue: true,
    })
    @Validate.IsBoolean()
    meetingUpcoming = true;

    @Field(is => Boolean, {
        description: "Reminder about a quick-response.",
        defaultValue: true,
    })
    @Validate.IsBoolean()
    returnToInfoTeam = true;

    @Field(is => Boolean, {
        description: "All push notifications in general.",
        defaultValue: true,
    })
    @Validate.IsBoolean()
    pushNotifications = true;

    @Field(is => Boolean, {
        description: '',
        defaultValue: true,
    })
    @Validate.IsBoolean()
    suppressWhileConnected = true;

    @Field(is => Boolean, {
        description: '',
        defaultValue: false,
    })
    @Validate.IsBoolean()
    useDebugApnsGateway = false;
}
