import {Resolver, FieldResolver, Root, Query, ID, Arg} from 'type-graphql';
import db, {sql} from '../dbconfig/dbconfig';
import {Fair} from '../schemas/Fair';
import {FairDevice} from '../schemas/FairDevice';
import {Device} from '../schemas/Device';

@Resolver((of) => FairDevice)
export class FairDeviceResolver {
    private fairDevices: FairDevice[] = [];
    private devices: Device[] = [];
    private fairs: Fair[] = [];

    @Query(() => FairDevice, {nullable: true})
    async fairDevice(@Arg('deviceId', () => ID, {nullable: true}) deviceId: string,
                     @Arg('id', () => ID, {nullable: true}) id: string): Promise<FairDevice> {
        console.log('FairDeviceResolver: getById');
        if (!deviceId && !id) {
            throw new Error('You have to either specify `deviceId` or `id`.');
        }
        if (deviceId && id) {
            throw new Error('You can only specify either `deviceId` or `id`.');
        }

        if (id) {
            deviceId = null;
        } else {
            id = null;
        }

        this.fairDevices = await db.query(sql`
            SELECT id,
                   name,
                   fair,
                   device,
                   added,
                   changed,
                   hid,
                   settings
            FROM fm."fairDevice"
            WHERE id = ${id} OR device = ${deviceId}
        `);

        return this.fairDevices[0];

    }

    @FieldResolver(is => Fair, {description: ''})
    async fair(@Root() fairDevice: FairDevice): Promise<Fair> {
        console.log('FairDeviceResolver: lade Fair nach');
        this.fairs = await db.query(sql`
            select id,
                   name,
                   timezone,
                   author,
                   features,
                   organization,
                   added,
                   changed,
                   hid
            from fm.fair
            where id = ${fairDevice.fair}
        `);
        return this.fairs[0];
    }

    @FieldResolver(is => Device, {description: ''})
    async device(@Root() fairDevice: FairDevice): Promise<Device> {
        console.log('FairDeviceResolver: lade Device nach ');
        this.devices = await db.query(sql`
            select id,
                   name,
                   subscriptions,
                   support,
                   "hasActiveConnection",
                   type,
                   "deviceIdentifier",
                   "pushIdentifier",
                   "user",
                   token,
                   added,
                   changed,
                   hid,
                   "lastAuthenticated",
                   "deliveryFailures"
            from fm.device
            where id = ${fairDevice.device}
        `);
        return this.devices[0];
    }

}