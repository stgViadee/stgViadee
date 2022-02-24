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
    private devices: Device[] = []
    private users: User[] = []
    private tokens: Token[] = []

    @Query((returns) => [Device], { nullable: true })
    async getDevices(): Promise<Device[]> {
        this.devices = await getAllDevices();
        return convertIdsToGlobalId('device', this.devices);
    }

    @Query((returns) => Device, { nullable: true })
    async device(@Arg("id") deviceId : string): Promise<Maybe<Device>> {
        this.devices = await getDeviceById(convertFromGlobalId(deviceId).id);
        return convertIdToGlobalId('device', this.devices[0]);
    }

    @FieldResolver(is => User, {description: ''})
    async createdBy(@Root() device: Device): Promise<User> {
        this.users = await getUserById(device.user);
        return convertIdToGlobalId('user', this.users[0]);
    }

    @FieldResolver(is => Token, {description: ''})
    async token(@Root() device: Device): Promise<Token> {
        this.tokens = await getTokenById(device.token);
        return this.tokens[0];
    }

}