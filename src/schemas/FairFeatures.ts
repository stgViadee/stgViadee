import * as Validate from "class-validator";
import * as GraphQL from "type-graphql";

export enum SupportedCurrencies {
    EURO = "€",
    US_DOLLAR = "$",
}
GraphQL.registerEnumType(SupportedCurrencies, {
    name: "SupportedCurrencies",
    description: "The currencies supported in FairManager.",
});

export enum SupportedLocales {
    GERMAN_GERMANY = "de-DE",
    ENGLISH_UNITED_STATES = "en-US",
}
GraphQL.registerEnumType(SupportedLocales, {
    name: "SupportedLocales",
    description: "The locales supported in FairManager.",
});

@GraphQL.ObjectType({
    description: "Features that should be available during the fair.",
})
export class FairFeatures {
    @GraphQL.Field(is => SupportedLocales, {
        description: ''
    })
    @Validate.IsEnum(SupportedLocales)
    locale: SupportedLocales = SupportedLocales.ENGLISH_UNITED_STATES;

    @GraphQL.Field(is => Boolean, {
        description: "Should meeting scheduling be enabled for the fair?",
    })
    @Validate.IsBoolean()
    meetings = true;

    @GraphQL.Field(is => Boolean, {
        description: "Should signage displays be enabled for the fair?",
    })
    @Validate.IsBoolean()
    signage = true;

    @GraphQL.Field(is => Boolean, {
        description: ''
    })
    @Validate.IsBoolean()
    icalendar = true;

    @GraphQL.Field(is => Boolean, {
        description: "Should business card scanners be enabled for the fair?",
    })
    @Validate.IsBoolean()
    scanner = false;

    @GraphQL.Field(is => Boolean, {
        description: ''
    })
    @Validate.IsBoolean()
    shop = false;

    @GraphQL.Field(is => SupportedCurrencies, {
        description: ''
    })
    @Validate.IsEnum(SupportedCurrencies)
    currency = SupportedCurrencies.US_DOLLAR;

    @GraphQL.Field(is => Boolean, {
        description: ''
    })
    @Validate.IsBoolean()
    staffMayOrder = false;

    @GraphQL.Field(is => Boolean, {
        description: "Should prices be printed on shop receipts?",
    })
    @Validate.IsBoolean()
    prices = true;

    @GraphQL.Field(is => Boolean, {
        description: "Should cost units be recorded when creating orders?",
    })
    @Validate.IsBoolean()
    costUnitAccounting = false;

    @GraphQL.Field(is => Boolean, {
        description: ''
    })
    @Validate.IsBoolean()
    autoAdvanceFairDays = false;

    @GraphQL.Field(is => Boolean, {
        description: ''
    })
    @Validate.IsBoolean()
    controlProductAvailability = false;
}
