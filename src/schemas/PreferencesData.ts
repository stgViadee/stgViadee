import * as Validate from "class-validator";
import { SupportedLocales } from "./FairFeatures";
import {Field, InputType, Int, ObjectType, registerEnumType} from 'type-graphql';

@InputType("DisplayPreferencesInput", {
  description: "Input for display preferences of a user.",
})
@ObjectType({
  description: "Display preferences of a user.",
})
export class DisplayPreferences {
  @Field(is => Boolean, {
    description: "Should users last names be displayed in front of their first names?",
    defaultValue: true,
  })
  @Validate.IsBoolean()
  showLastNameFirst = true;

  @Field(is => Boolean, {
    description: "Should profile pictures be displayed?",
    defaultValue: true,
  })
  @Validate.IsBoolean()
  avatars = true;

  @Field(is => Boolean, {
    description: "Should the names of users be displayed?",
    defaultValue: true,
  })
  @Validate.IsBoolean()
  name = true;

  @Field(is => Boolean, {
    description: "Should users languages be displayed?",
    defaultValue: true,
  })
  @Validate.IsBoolean()
  language = true;

  @Field(is => Boolean, {
    description: "Should tags be displayed?",
    defaultValue: true,
  })
  @Validate.IsBoolean()
  tags = true;

  @Field(is => Boolean, {
    description: "Should users countries be displayed?",
    defaultValue: true,
  })
  @Validate.IsBoolean()
  country = true;

  @Field(is => Boolean, {
    description: "Should users, who are currently unavailble, be displayed?",
    defaultValue: true,
  })
  @Validate.IsBoolean()
  unavailable = true;

  @Field(is => Boolean, {
    description: "Should users without an attendance today be displayed?",
    defaultValue: true,
  })
  @Validate.IsBoolean()
  unexpected = true;

  @Field(is => Int, {
    description: "How many users should be displayed on a page?",
    defaultValue: 100,
  })
  @Validate.IsPositive()
  @Validate.IsInt()
  @Validate.Max(100)
  usersPerPage = 100;
}

export enum MeetingViewMode {
  LARGE = "large",
  SMALL = "small",
  LANES = "lanes",
}
registerEnumType(MeetingViewMode, {
  name: "MeetingViewMode",
  description: "How large individual lanes in the planner appear.",
});

@InputType("MeetingPreferencesInput", {
  description: "Input for meeting planner preferences of a user.",
})
@ObjectType({
  description: "Meeting planner preferences of a user.",
})
export class MeetingPreferences {
  @Field(is => MeetingViewMode, {
    description: "The size of allocations on the meeting planner.",
    defaultValue: MeetingViewMode.LARGE,
  })
  @Validate.IsEnum(MeetingViewMode)
  viewMode = MeetingViewMode.LARGE;
}

export enum MessageSendMode {
  ENTER = "enter",
  CTRL_ENTER = "ctrlEnter",
}
registerEnumType(MessageSendMode, {
  name: "MessageSendMode",
  description: "The keystroke the will send messages in the UI.",
});

@InputType("MessagingPreferencesInput", {
  description: "Input for messaging preferences of a user.",
})
@ObjectType({
  description: "Messaging preferences of a user.",
})
export class MessagingPreferences {
  @Field(is => MessageSendMode, {
    description: "The keystroke the users wants to use to send messages.",
    defaultValue: MessageSendMode.ENTER,
  })
  @Validate.IsEnum(MessageSendMode)
  sendOn = MessageSendMode.ENTER;

  @Field(is => Boolean, {
    description: "Has the user already picked a prefered keystroke?",
    defaultValue: false,
  })
  @Validate.IsBoolean()
  sendOnPicked = false;
}

export enum PhoneStyle {
  /**
   * Display a button that dials the number when clicked.
   */
  BUTTON = "button",

  /**
   * Display the phone number as a `tel:` hyperlink.
   */
  HYPERLINK = "clickable",

  /**
   * Select phone number when it is clicked.
   */
  SELECT_ON_CLICK = "selectable",

  /**
   * Don't show phone number in UI.
   */
  HIDDEN = "hidden",
}
registerEnumType(PhoneStyle, {
  name: "PhoneStyle",
  description: "How the phone call button should be displayed in the UI.",
});

@InputType("ShopPreferencesInput", {
  description: "Input for preferences about the shop area in the app.",
})
@ObjectType({
  description: "Preferences about the shop area in the app.",
})
export class ShopPreferences {
  @Field(is => Boolean, {
    description: "Should the search box be displayed?",
    defaultValue: true,
  })
  @Validate.IsBoolean()
  showSearch = true;

  @Field(is => Boolean, {
    description: "Should all product groups be expanded by default?",
    defaultValue: true,
  })
  @Validate.IsBoolean()
  showAll = true;
}

@InputType("PreferencesDataInput", {
  description: "Input for preferences of a user.",
})
@ObjectType({
  description: "Preferences of a user.",
})
export class PreferencesData {
  @Field(is => SupportedLocales, {
    description: "The locale selected by this user. `null` means auto-detect.",
    defaultValue: null,
    nullable: true,
  })
  @Validate.IsEnum(SupportedLocales)
  @Validate.IsOptional()
  locale: SupportedLocales | null = null;

  @Field(is => DisplayPreferences, {
    description: "The users main UI preferences.",
    defaultValue: new DisplayPreferences(),
  })
  @Validate.ValidateNested()
  display = new DisplayPreferences();

  @Field(is => MeetingPreferences, {
    description: "The users meeting planner UI preferences.",
    defaultValue: new MeetingPreferences(),
  })
  @Validate.ValidateNested()
  meetings = new MeetingPreferences();

  @Field(is => MessagingPreferences, {
    description: "The users messaging UI preferences.",
    defaultValue: new MessagingPreferences(),
  })
  @Validate.ValidateNested()
  messaging = new MessagingPreferences();

  @Field(is => PhoneStyle, {
    description: "How should the phone number be displayed in the UI?",
    defaultValue: PhoneStyle.BUTTON,
  })
  @Validate.IsEnum(PhoneStyle)
  phoneStyle = PhoneStyle.BUTTON;

  @Field(is => PhoneStyle, {
    description: "Indicates the last *What's new* message the user has seen.",
    defaultValue: null,
    nullable: true,
  })
  @Validate.IsString()
  @Validate.MaxLength(20)
  @Validate.IsOptional()
  whatsnew: string | null = null;

  @Field(is => ShopPreferences, {
    description: "Preferences about the shop area in the app.",
    defaultValue: new ShopPreferences(),
    deprecationReason: "Shop preferences should now be maintained inside the app.",
  })
  @Validate.ValidateNested()
  shop = new ShopPreferences();
}
