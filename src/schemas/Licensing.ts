import {Field, Int, ObjectType} from 'type-graphql';
import {Node} from './Node';
import {Organization} from './Organization';

export enum LicenseType {
    Bronze = "bronze",
    Silver = "silver",
    Gold = "gold",
    Platinum = "platinum",
    Demo = "demo",
}

@ObjectType({
    description: 'The different ways you can receive support for FairManager products.'
})
export class SupportOptions {
    @Field(is => Boolean)
    email = false;

    @Field(is => Boolean)
    phone = false;
}

@ObjectType({
    description: 'The different ways you can receive support for FairManager products.'
})
export class LicensingThresholds {
    @Field(is => Int)
    freeStaff = 0;
}

@ObjectType({
    description: 'The specific features a license controls.'
})
export class LicensingTerms {
    @Field(is => Boolean)
    userManagement = false;

    @Field(is => Boolean)
    events = false;

    @Field(is => Boolean)
    meetings = false;

    @Field(is => Boolean)
    registration = false;

    @Field(is => Boolean)
    party = false;

    @Field(is => Boolean)
    catering = false;

    @Field(is => SupportOptions)
    support = new SupportOptions();

    @Field(is => LicensingThresholds)
    threshold = new LicensingThresholds();
}

@ObjectType({
    description: 'A license that is assigned to an organization.',
    implements: Node,
})
export class Licensing  {
    @Field(is => String, {
        description: "The name of the license.",
    })
    name: string;

    @Field(is => Date, {
        description: "The point in time when this license becomes active.",
    })
    validFrom: Date;

    @Field(is => Date, {
        description: "The point in time when this license is no longer active.",
    })
    validUntil: Date;

    @Field(() => Organization)
    organization!: string;

    @Field(() => LicensingTerms)
    terms = new LicensingTerms();


}
