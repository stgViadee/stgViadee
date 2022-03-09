import { stripIndent } from "common-tags";
import {Field, InputType} from 'type-graphql';
import {IsBoolean, IsDate, IsOptional} from 'class-validator';

@InputType({
    description: stripIndent`
  Input for a request to filter fair days.
  `,
})
export class FilterFairDayInput {
    @Field(is => Boolean, {
        description: stripIndent`
    Return only the fair day correlating to the current time.

    Note that this check is *always* performed in UTC. If other criteria for
     selection is necessary, it should be performed client-side.
    `,
        nullable: true,
    })
    @IsBoolean()
    @IsOptional()
    isToday?: boolean | undefined;

    @Field(is => Boolean, {
        description: stripIndent`
    
    `,
        nullable: true,
    })
    @IsDate()
    @IsOptional()
    open_lte?: boolean | undefined;

    @Field(is => Boolean, {
        description: stripIndent`
    
    `,
        nullable: true,
    })
    @IsDate()
    @IsOptional()
    close_gte?: boolean | undefined;
}
