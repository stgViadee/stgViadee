import {Field, ObjectType, registerEnumType} from 'type-graphql';

export enum ProfileEditMode {
    /**
     * Organizers are also allowed to edit profiles.
     */
    ORGANIZERS = "organizers",

    /**
     * Only administrators can edit profiles.
     */
    ADMINISTRATORS_ONLY = "administratorsOnly",
}
registerEnumType(ProfileEditMode, {
    name: "ProfileEditMode",
    description: "Who is allowed to edit profiles in this organization?",
});

@ObjectType({
    description: "Preferences of an organization.",
})
export class OrganizationPreferencesData {
    @Field(is => ProfileEditMode, {
        description: "Who is allowed to edit the user profiles in this organization?",
    })
    profileEditMode = ProfileEditMode.ADMINISTRATORS_ONLY;

    @Field(is => Boolean, {
        description: "Can users or only info desk personnel start new conversations?",
    })
    canUsersStartConversations = false;
}
