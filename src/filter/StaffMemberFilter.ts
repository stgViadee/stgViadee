import {Field, GraphQLISODateTime, InputType} from 'type-graphql';
import {GraphQLBoolean, GraphQLString} from 'graphql';

@InputType({
    description: 'Input for a request to filter staff members.'
})
export class StaffMemberFilter {
    @Field(is => GraphQLISODateTime, {
        nullable: true,
    })
    attendance?: Date;

    @Field(is => GraphQLString, {
        nullable: true,
    })
    id?: string;

    @Field(is => GraphQLBoolean, {
        nullable: true,
    })
    isAvailable?: boolean;

    @Field(is => GraphQLBoolean, {
        nullable: true,
    })
    isAttendingToday?: boolean;

    @Field(is => GraphQLString, {
        nullable: true,
    })
    inGroup?: string;

    @Field(is => GraphQLString, {
        nullable: true,
    })
    locale?: string;

    @Field(is => GraphQLString, {
        nullable: true,
    })
    search?: string;

    @Field(is => GraphQLString, {
        nullable: true,
    })
    zipCountry?: string;

    @Field(is => GraphQLString, {
        nullable: true,
    })
    email?: string;

    @Field(is => GraphQLString, {
        nullable: true,
    })
    salutation?: string;

    @Field(is => GraphQLString, {
        nullable: true,
    })
    firstName?: string;

    @Field(is => GraphQLString, {
        nullable: true,
    })
    lastName?: string;

    @Field(is => GraphQLString, {
        nullable: true,
    })
    country?: string;

    @Field(is => GraphQLString, {
        nullable: true,
    })
    language?: string;

    @Field(is => GraphQLString, {
        nullable: true,
    })
    primaryPhone?: string;

    @Field(is => GraphQLString, {
        nullable: true,
    })
    costUnit?: string;

    @Field(is => GraphQLString, {
        nullable: true,
    })
    tag?: string;

    @Field(is => GraphQLString, {
        nullable: true,
    })
    department?: string;



}