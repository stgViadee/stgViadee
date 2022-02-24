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

}