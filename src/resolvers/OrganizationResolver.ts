import {Arg, Args, FieldResolver, Info, Maybe, Query, Resolver, Root} from 'type-graphql';
import {Organization} from '../schemas/Organization';
import {User} from '../schemas/User';
import {getUserById, getUserByOrganizationIdCount, getUserByOrganizationIdPaginated} from '../queries/UserQueries';
import {getAllOrganizations, getOrganizationById} from '../queries/OrganizationQueries';
import {convertFromGlobalId, convertIdsToGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {ConnectionArgs} from '../schemas/relay/ConnectionArgs';
import {offsetToCursor} from 'graphql-relay';
import {FairConnection} from '../schemas/FairConnection';
import {getFairsByOrganizationIdCount, getFairsByOrganizationIdPaginated} from '../queries/FairQueries';
import {TagConnection} from '../schemas/TagConnection';
import {getTagsByOrganizationIdCount, getTagsByOrganizationIdPaginated} from '../queries/TagQueries';
import {
    getCompaniesByOrganizationIdCount,
    getCompaniesByOrganizationIdPaginated
} from '../queries/StaffMemberQueries';
import {CompanyConnection} from '../schemas/CompanyConnection';
import {DepartmentConnection} from '../schemas/DepartmentConnection';
import {
    getDepartmentsByOrganizationIdCount,
    getDepartmentsByOrganizationIdPaginated
} from '../queries/DepartmentQueries';
import {OrganizationPreferences} from '../schemas/OrganizationPreferences';
import {getOrganizationPreferencesById} from '../queries/OrganizationPreferencesQueries';
import {Licensing} from '../schemas/Licensing';
import {getLicensingByOrganizationId} from '../queries/LicensingQueries';
import {UserGroupConnection} from '../schemas/UserGroupConnection';
import {
    getUserGroupsByOrganizationIdCount,
    getUserGroupsByOrganizationIdPaginated
} from '../queries/UserGroupQueries';
import {CreditConnection} from '../schemas/CreditConnection';
import {getCreditsByOrganizationIdCount, getCreditsByOrganizationIdPaginated} from '../queries/CreditQueries';
import {GraphQLResolveInfo} from 'graphql';
import {UserConnection} from '../schemas/UserConnection';
import {compileConnection} from '../schemas/relay/ConnectionBuilder';

@Resolver((of) => Organization)
export class OrganizationResolver {

    @FieldResolver(is => User, {description: ''})
    async author(@Root() organization: Organization): Promise<User> {
        const users = await getUserById(organization.author)
        return convertIdToGlobalId('user', users[0]);
    }

    // TODO Prüfen, ob Avatar-FieldResolver noch notwendig ist, da aktuell keine relativen URLs verwendet werden

    @FieldResolver(is => FairConnection, {
        description: 'The fairs that this organization is attending.',
    })
    async fairs(
        @Args() args: ConnectionArgs,
        @Root() organization: Organization
    ): Promise<FairConnection> {
        args.validateArgs();

        const {type, id} = convertFromGlobalId(organization.id);
        const countResult = await getFairsByOrganizationIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults =  await getFairsByOrganizationIdPaginated(id, bounds);
        return compileConnection('fair', paginatedResults, bounds, args, totalCount);
    }

    @FieldResolver(is => TagConnection, {
        description: 'The tags created in this organization.',
    })
    async tags(
        @Args() args: ConnectionArgs,
        @Root() organization: Organization
    ): Promise<TagConnection> {
        args.validateArgs();
        const {type, id} = convertFromGlobalId(organization.id);
        const countResult = await getTagsByOrganizationIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults =  await getTagsByOrganizationIdPaginated(id, bounds);
        return compileConnection('tag', paginatedResults, bounds, args, totalCount);
    }

    @FieldResolver(is => CompanyConnection, {
        description: 'The companies created in this organization.',
    })
    async companies(
        @Args() args: ConnectionArgs,
        @Root() organization: Organization
    ): Promise<CompanyConnection> {
        args.validateArgs();

        const {type, id} = convertFromGlobalId(organization.id);
        const countResult = await getCompaniesByOrganizationIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults =  await getCompaniesByOrganizationIdPaginated(id, bounds);
        return compileConnection('company', paginatedResults, bounds, args, totalCount);
    }

    @FieldResolver(is => DepartmentConnection, {
        description: 'The departments created in this organization.',
    })
    async departments(
        @Args() args: ConnectionArgs,
        @Root() organization: Organization
    ): Promise<DepartmentConnection> {
        args.validateArgs();

        const {type, id} = convertFromGlobalId(organization.id);
        const countResult = await getDepartmentsByOrganizationIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults =  await getDepartmentsByOrganizationIdPaginated(id, bounds);
        return compileConnection('department', paginatedResults, bounds, args, totalCount);
    }

    @FieldResolver(is => OrganizationPreferences, {description: ''})
    async preferences(@Root() organization: Organization): Promise<OrganizationPreferences> {
        const preferences = await getOrganizationPreferencesById(organization.preferences)
        return convertIdToGlobalId('organizationPreferences', preferences[0]);
    }

    @FieldResolver(is => [Licensing], {description: ''})
    async licenses(@Root() organization: Organization): Promise<Licensing[]> {
        const licenses = await getLicensingByOrganizationId(convertFromGlobalId(organization.id).id)
        return convertIdsToGlobalId('licensing', licenses);
    }

    @FieldResolver(is => UserGroupConnection, {
        description: 'The user groups that are defined in this organization',
    })
    async groups(
        @Args() args: ConnectionArgs,
        @Root() organization: Organization
    ): Promise<UserGroupConnection> {
        args.validateArgs();

        const {type, id} = convertFromGlobalId(organization.id);
        const countResult = await getUserGroupsByOrganizationIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults =  await getUserGroupsByOrganizationIdPaginated(id, bounds);
        return compileConnection('userGroup', paginatedResults, bounds, args, totalCount);
    }

    @FieldResolver(is => CreditConnection, {description: 'The credit transactions made by this organization.'})
    async ledger(
        @Args() args: ConnectionArgs,
        @Root() organization: Organization
    ): Promise<CreditConnection> {
        args.validateArgs();

        const {type, id} = convertFromGlobalId(organization.id);
        const countResult = await getCreditsByOrganizationIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults =  await getCreditsByOrganizationIdPaginated(id, bounds);
        return compileConnection('credit', paginatedResults, bounds, args, totalCount);
    }

    @FieldResolver(is => UserConnection, {
        description: "The entire staff of the organization.",
    })
    async members(
        @Args() args: ConnectionArgs,
        @Root() organization: Organization,
        @Info() info: GraphQLResolveInfo
    ): Promise<UserConnection> {
        args.validateArgs();

        const {type, id} = convertFromGlobalId(organization.id);
        const countResult = await getUserByOrganizationIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getUserByOrganizationIdPaginated(id,bounds);
        return compileConnection('document', paginatedResults, bounds, args, totalCount);
    }


    @Query((returns) => [Organization], { nullable: true })
    async organizations(): Promise<Organization[]> {
        const organizations = await getAllOrganizations();
        return convertIdsToGlobalId('organization', organizations);
    }

    @Query((returns) => Organization, { nullable: true })
    async organization(@Arg("id") organizationId : string): Promise<Maybe<Organization>> {
        const organizations = await getOrganizationById(convertFromGlobalId(organizationId).id)
        return convertIdToGlobalId('organization', organizations[0]);
    }




}