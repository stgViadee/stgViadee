import * as GraphQL from 'type-graphql';
import {Field, ObjectType} from 'type-graphql';
import {Node} from './Node';

@ObjectType( { implements: Node} )
export class SupportInfoDevice {
    @Field(is => String, {nullable: true})
    architecture? = '';

    @Field(is => String, {
        nullable: true,
    })
    connectionType? = '';

    @Field(is => Boolean, {
        nullable: true,
    })
    isAdbEnabled?: boolean = undefined;

    @Field(is => Boolean, {
        nullable: true,
    })
    isBackgroundRefreshAuthorized?: boolean = undefined;

    @Field(is => Boolean, {
        nullable: true,
    })
    isDataRoamingEnabled?: boolean = undefined;

    @Field(is => Boolean, {
        nullable: true,
    })
    isNetworkConnected?: boolean = undefined;

    @Field(is => Boolean, {
        nullable: true,
    })
    isRooted?: boolean = undefined;

    @Field(is => Boolean, {
        nullable: true,
    })
    isWebsocketConnected?: boolean = undefined;

    @Field(is => Boolean, {
        nullable: true,
    })
    isWiFiAvailable?: boolean = undefined;

    @Field(is => Boolean, {
        nullable: true,
    })
    isWiFiEnabled?: boolean = undefined;

    @Field(is => Boolean, {

        nullable: true,
    })
    isVirtual?: boolean = undefined;

    @Field(is => String, {

        nullable: true,
    })
    manufacturer? = '';

    @Field(is => String, {

        nullable: true,
    })
    model? = '';

    @Field(is => String, {
        nullable: true,
    })
    name? = '';

    @Field(is => String, {

        nullable: true,
    })
    serial? = '';

    @Field(is => String, {

        nullable: true,
    })
    uuid? = '';
}
