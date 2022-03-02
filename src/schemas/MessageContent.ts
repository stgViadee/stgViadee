import {Field, InputType, ObjectType} from 'type-graphql';
import {IsUrl, IsUUID, Length, MaxLength, Validate} from 'class-validator';
import {QuickResponse} from './QuickResponse';

@InputType("MessgeContentInput", {
    description: "Input type to create a `MessageContent`.",
})
@ObjectType({
    description: "The content of a message.",
})
export class MessageContent {
    @Field( {
        description: "The text that was entered for the message.",
        nullable: true,
    })
    @Length(1, 200)
    text: string;

    @Field( {
        description: 'A URL pointing to an image that was sent with the message.',
        nullable: true,
    })
    @IsUrl()
    @MaxLength(300)
    image: string;

    @Field( {
        description: "The UUID of a quick-response that the user selected.",
        nullable: true,
    })
    @IsUUID(4)
    quickResponse: string;

    static fromText(text: string): MessageContent {
        const messageContent = new MessageContent();
        messageContent.text = text;
        return messageContent;
    }
}
