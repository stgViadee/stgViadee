import {Field, ObjectType} from 'type-graphql';
import {Organization} from './Organization';
import {Fair} from './Fair';
import {UserConnection} from './UserConnection';
import {Filter} from 'type-graphql-filter';

export enum UserGroupType {
    /**
     * A group without purpose.
     */
    Anonymous = "00000000-0000-4000-a000-900000000000",

    /**
     * Users in this group are administrators of the organization.
     * This is the highest privileged group.
     */
    OrganizationAdmin = "00000000-0000-4000-a000-000000000000",

    /**
     * Users who are plain, old members of the organization.
     */
    OrganizationMember = "00000000-0000-4000-a000-100000000000",

    /**
     * Users who primarly work at the info desk at a fair.
     */
    FairInfoDesk = "09fa7fcb-3967-4b68-9105-9de68b6b5cfc",

    /**
     * Users who primarly work at the booth.
     */
    FairBoothTeam = "89f1cda1-af49-42bf-81a0-2702363508df",

    /**
     * Users who primarly work on preparing a fair, but don't participate in it.
     */
    FairOrganizer = "c0d65e18-0560-4787-9c15-9029a70b182a",

    /**
     * Users who primarly interact with the shop system at fairs.
     */
    FairShop = "c2f30d7c-3433-4936-a58a-6785e2077b9f",
}

@ObjectType()
export class UserGroup {

    @Field()
    id: string;

    @Field({nullable:true})
    name: string;

    @Field()
    @Filter(['eq'])
    type: string;

    @Field(() => Organization)
    organization: Organization;

    @Field({nullable:true})
    added: Date;

    @Field({nullable:true})
    changed: Date;

    @Field(() => Fair, {nullable:true})
    @Filter(['eq'])
    fair: string;

    @Field(() => UserConnection, {nullable : true})
    members: UserConnection;
}