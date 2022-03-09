import {Query, Resolver, Arg, Maybe, FieldResolver, Root, Args, ID} from 'type-graphql';
import {User} from '../schemas/User';
import {UserProfile} from '../schemas/UserProfile';
import {Organization} from '../schemas/Organization';
import {getOrganizationById} from '../queries/OrganizationQueries';
import {convertFromGlobalId, convertIdsToGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {getUserById} from '../queries/UserQueries';
import {Language} from '../schemas/Language';
import {getLanguagesByUserProfileId} from '../queries/LanguageQueries';
import {ConnectionArgs} from '../schemas/relay/ConnectionArgs';
import {TagConnection} from '../schemas/TagConnection';
import {getStaffMemberByFairIdCount, getStaffMemberByFairIdPaginated} from '../queries/StaffMemberQueries';
import {compileConnection} from '../schemas/relay/ConnectionBuilder';
import {getTagsByUserProfileIdCount, getTagsByUserProfileIdPaginated} from '../queries/TagQueries';
import {DepartmentConnection} from '../schemas/DepartmentConnection';
import {getDepartmentsByUserProfileIdCount, getDepartmentsByUserProfileIdPaginated} from '../queries/DepartmentQueries';
import {CompanyConnection} from '../schemas/CompanyConnection';
import {getCompaniesByUserProfileIdCount, getCompaniesByUserProfileIdPaginated} from '../queries/CompanyQueries';

@Resolver((of) => UserProfile)
export class UserProfileResolver {


    @FieldResolver(is => String, {
        complexity: 0.1,
        description: "The mobile phone number of the user.",
        nullable: true,
    })
    async phone(@Root() userProfile: UserProfile): Promise<Maybe<string>> {
        // Normalize empty string to null.
        return userProfile.phone || null;
    }


    @FieldResolver(is => String, {
        complexity: 0.1,
        description: "The URL that points to the avatar image of the user.",
        nullable: true,
    })
    async avatar(@Root() userProfile: UserProfile): Promise<Maybe<string>> {
        if (!userProfile.avatar) {
            return null;
        }

        return userProfile.avatar;
    }


    @FieldResolver(is => Organization, {
        description: "The organization this is a profile for.",
    })
    async organization(
        @Root() userProfile: UserProfile
    ): Promise<Maybe<Organization>> {
        const organizations = await getOrganizationById(userProfile.organization);
        return convertIdToGlobalId('organization', organizations[0])
    }


    @FieldResolver(is => User, {
        description: "The user this is a profile for.",
    })
    async user(
        @Root() userProfile: UserProfile
    ): Promise<Maybe<User>> {
        const users = await getUserById(userProfile.user);
        return convertIdToGlobalId('user', users[0])
    }


    @FieldResolver(is => [Language], {
        description: "Languages this user speaks.",
    })
    async languages(@Root() userProfile: UserProfile): Promise<Iterable<Language>> {
        const languages = await getLanguagesByUserProfileId(convertFromGlobalId(userProfile.id).id);
        return convertIdsToGlobalId('language', languages)
    }


    @FieldResolver(is => TagConnection, {
        description: "Tags assigned to the profile.",
    })
    async tags(
        @Args() args: ConnectionArgs,
        @Root() userProfile: UserProfile
    ): Promise<TagConnection> {
        args.validateArgs();

        const {type, id} = convertFromGlobalId(userProfile.id);
        const countResult = await getTagsByUserProfileIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getTagsByUserProfileIdPaginated(id,bounds);
        return compileConnection('tag', paginatedResults, bounds, args, totalCount);
    }


    @FieldResolver(is => DepartmentConnection, {
        description: "Departments assigned to the profile.",
    })
    async departments(
        @Args() args: ConnectionArgs,
        @Root() userProfile: UserProfile
    ): Promise<DepartmentConnection> {
        args.validateArgs();

        const {type, id} = convertFromGlobalId(userProfile.id);
        const countResult = await getDepartmentsByUserProfileIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getDepartmentsByUserProfileIdPaginated(id,bounds);
        return compileConnection('department', paginatedResults, bounds, args, totalCount);
    }


    @FieldResolver(is => CompanyConnection, {
        description: "Companies assigned to the profile.",
    })
    async companies(
        @Args() args: ConnectionArgs,
        @Root() userProfile: UserProfile
    ): Promise<CompanyConnection> {
        args.validateArgs();

        const {type, id} = convertFromGlobalId(userProfile.id);
        console.log(id)
        const countResult = await getCompaniesByUserProfileIdCount(id);

        const totalCount = countResult[0].anzahl;
        const bounds = args.calculateBounds(totalCount);

        const paginatedResults = await getCompaniesByUserProfileIdPaginated(id,bounds);
        return compileConnection('company', paginatedResults, bounds, args, totalCount);
    }


    // @FieldResolver(is => ZipCodeInfoConnection, {
    //     description: "ZIP codes assigned to the profile.",
    // })
    // async zipCodes(
    //     @Args() page: PageArguments,
    //     @Root() userProfile: UserProfile
    // ): Promise<ZipCodeInfoConnection> {
    //     // We want all ZIP codes that are referenced by this user profile.
    //     const queryClause = {
    //         userProfiles: { id: userProfile.id },
    //     };
    //
    //     const repoTools = new PaginationHelper(context.messageContext.em);
    //
    //     const nodes = await repoTools.resolvePage(ZipCodeInfo, queryClause, page);
    //     const pageInfo = await repoTools.getPageInfo(ZipCodeInfo, queryClause, page, nodes);
    //
    //     return ZipCodeInfoConnection.fromSubset({ pageRequest: page, nodes, ...pageInfo });
    // }

}