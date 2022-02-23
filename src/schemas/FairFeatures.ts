import * as Validate from "class-validator";
import * as GraphQL from "type-graphql";
import {Field, ObjectType, registerEnumType} from 'type-graphql';
import {Node} from './Node';

export enum SupportedCurrencies {
    EURO = "€",
    US_DOLLAR = "$",
}
registerEnumType(SupportedCurrencies, {
    name: "SupportedCurrencies",
    description: "The currencies supported in FairManager.",
});

export enum SupportedLocales {
    GERMAN_GERMANY = "de-DE",
    ENGLISH_UNITED_STATES = "en-US",
}
registerEnumType(SupportedLocales, {
    name: "SupportedLocales",
    description: "The locales supported in FairManager.",
});

@ObjectType( {
    implements: Node,
    description: "Features that should be available during the fair.",
})
export class FairFeatures {
    @Field(is => SupportedLocales, {
        description: ''
    })
    @Validate.IsEnum(SupportedLocales)
    locale: SupportedLocales = SupportedLocales.ENGLISH_UNITED_STATES;

    @Field(is => Boolean, {
        description: "Should meeting scheduling be enabled for the fair?",
    })
    @Validate.IsBoolean()
    meetings = true;

    @Field(is => Boolean, {
        description: "Should signage displays be enabled for the fair?",
    })
    @Validate.IsBoolean()
    signage = true;

    @Field(is => Boolean, {
        description: ''
    })
    @Validate.IsBoolean()
    icalendar = true;

    @Field(is => Boolean, {
        description: "Should business card scanners be enabled for the fair?",
    })
    @Validate.IsBoolean()
    scanner = false;

    @Field(is => Boolean, {
        description: ''
    })
    @Validate.IsBoolean()
    shop = false;

    @Field(is => SupportedCurrencies, {
        description: ''
    })
    @Validate.IsEnum(SupportedCurrencies)
    currency = SupportedCurrencies.US_DOLLAR;

    @Field(is => Boolean, {
        description: ''
    })
    @Validate.IsBoolean()
    staffMayOrder = false;

    @Field(is => Boolean, {
        description: "Should prices be printed on shop receipts?",
    })
    @Validate.IsBoolean()
    prices = true;

    @Field(is => Boolean, {
        description: "Should cost units be recorded when creating orders?",
    })
    @Validate.IsBoolean()
    costUnitAccounting = false;

    @Field(is => Boolean, {
        description: ''
    })
    @Validate.IsBoolean()
    autoAdvanceFairDays = false;

    @Field(is => Boolean, {
        description: ''
    })
    @Validate.IsBoolean()
    controlProductAvailability = false;
}
