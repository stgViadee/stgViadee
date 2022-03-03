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

        const userIdMock = 'f6265805-0dab-4de0-9297-80ed6e916b44';
        const userId = userIdMock;  // TODO userId aus Kontext laden -> hier temp. Mock

        if (!deviceId && !fairDeviceId) {
            throw new Error('You have to either specify `deviceId` or `id`.');
        }
        if (deviceId && fairDeviceId) {
            throw new Error('You can only specify either `deviceId` or `id`.');
        }

        let fairDevices;
        if (fairDeviceId) {
        fairDevices = await getFairDeviceById(convertFromGlobalId(fairDeviceId).id, userId);
        } else {
        fairDevices = await getFairDeviceByDeviceId(convertFromGlobalId(deviceId).id, userId);
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