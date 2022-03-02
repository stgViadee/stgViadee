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

    @Query(() => FairDevice, {nullable: true})
    async fairDevice(@Arg('deviceId', () => ID, {nullable: true}) deviceId: string,
                     @Arg('id', () => ID, {nullable: true}) fairDeviceId: string): Promise<FairDevice> {
        if (!deviceId && !fairDeviceId) {
            throw new Error('You have to either specify `deviceId` or `id`.');
        }
        if (deviceId && fairDeviceId) {
            throw new Error('You can only specify either `deviceId` or `id`.');
        }

        var fairDevices;
        if (fairDeviceId) {
        fairDevices = await getFairDeviceById(convertFromGlobalId(fairDeviceId).id);
        } else {
        fairDevices = await getFairDeviceByDeviceId(convertFromGlobalId(deviceId).id);
        }

        return convertIdToGlobalId('fairdevice', fairDevices[0]);

    }

    @FieldResolver(is => Fair, {description: ''})
    async fair(@Root() fairDevice: FairDevice): Promise<Fair> {
        const fairs = await getFairById(fairDevice.fair);
        return convertIdToGlobalId('fair', fairs[0]);
    }

    @FieldResolver(is => Device, {description: ''})
    async device(@Root() fairDevice: FairDevice): Promise<Device> {
        const devices = await getDeviceById(fairDevice.device);
        return convertIdToGlobalId('device', devices[0]);
    }

}