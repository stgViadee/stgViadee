import {Resolver, FieldResolver, Root, Query, ID, Arg} from 'type-graphql';
import {Fair} from '../schemas/Fair';
import {FairDevice} from '../schemas/FairDevice';
import {Device} from '../schemas/Device';
import {getFairById} from '../queries/FairQueries';
import {getFairDeviceByDeviceId, getFairDeviceById} from '../queries/FairDeviceQueries';
import {convertFromGlobalId, convertIdToGlobalId} from '../schemas/relay/GlobalIdHandler';
import {getDeviceById} from '../queries/DeviceQueries';

@Resolver((of) => FairDevice)
export class FairDeviceResolver {
    private fairDevices: FairDevice[] = [];
    private devices: Device[] = [];
    private fairs: Fair[] = [];

    @Query(() => FairDevice, {nullable: true})
    async fairDevice(@Arg('deviceId', () => ID, {nullable: true}) deviceId: string,
                     @Arg('id', () => ID, {nullable: true}) fairDeviceId: string): Promise<FairDevice> {
        if (!deviceId && !fairDeviceId) {
            throw new Error('You have to either specify `deviceId` or `id`.');
        }
        if (deviceId && fairDeviceId) {
            throw new Error('You can only specify either `deviceId` or `id`.');
        }

        if (fairDeviceId) {
        this.fairDevices = await getFairDeviceById(convertFromGlobalId(fairDeviceId).id);
        } else {
        this.fairDevices = await getFairDeviceByDeviceId(convertFromGlobalId(deviceId).id);
        }

        return convertIdToGlobalId('fairdevice', this.fairDevices[0]);

    }

    @FieldResolver(is => Fair, {description: ''})
    async fair(@Root() fairDevice: FairDevice): Promise<Fair> {
        this.fairs = await getFairById(fairDevice.fair);
        return convertIdToGlobalId('fair', this.fairs[0]);
    }

    @FieldResolver(is => Device, {description: ''})
    async device(@Root() fairDevice: FairDevice): Promise<Device> {
        this.devices = await getDeviceById(fairDevice.device);
        return convertIdToGlobalId('device', this.devices[0]);
    }

}