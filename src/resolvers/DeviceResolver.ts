import {Arg, Ctx, FieldResolver, Maybe, Query, Resolver, Root} from 'type-graphql';
import {Device} from '../schemas/Device';
import {User} from '../schemas/User';
import {Token} from '../schemas/Token';
import {getAllDevices, getDeviceById} from '../queries/DeviceQueries';
import {getUserById} from '../queries/UserQueries';
import {getTokenById} from '../queries/TokenQueries';
import {convertFromGlobalId, convertIdsToGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';

@Resolver((of) => Device)
export class DeviceResolver {

    @Query((returns) => [Device], { nullable: true })
    async getDevices(): Promise<Device[]> {
        const devices = await getAllDevices();
        return convertIdsToGlobalId('device', devices);
    }

    @Query((returns) => Device, { nullable: true })
    async device(@Arg("id") deviceId : string): Promise<Maybe<Device>> {
        const devices = await getDeviceById(convertFromGlobalId(deviceId).id);
        return convertIdToGlobalId('device', devices[0]);
    }

    @FieldResolver(is => User, {description: ''})
    async user(@Root() device: Device): Promise<User> {
        const users = await getUserById(device.user);
        return convertIdToGlobalId('user', users[0]);
    }

    @FieldResolver(is => Token, {description: ''})
    async token(@Root() device: Device): Promise<Token> {
        const tokens = await getTokenById(device.token);
        return tokens[0];
    }

}