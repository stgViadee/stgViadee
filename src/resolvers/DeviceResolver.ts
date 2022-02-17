import {Arg, Ctx, FieldResolver, Maybe, Query, Resolver, Root} from 'type-graphql';
import db, {sql} from '../dbconfig/dbconfig';
import {Device} from '../schemas/Device';
import {User} from '../schemas/User';
import {Token} from '../schemas/Token';

@Resolver((of) => Device)
export class DeviceResolver {
    private devices: Device[] = []
    private users: User[] = []
    private tokens: Token[] = []

    @Query((returns) => [Device], { nullable: true })
    async getDevices(): Promise<Device[]> {
        console.log("DeviceResolver: getAll")
        this.devices = await db.query(sql `
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
        `);
        return this.devices;
    }

    @Query((returns) => Device, { nullable: true })
    async device(@Arg("id") id : string): Promise<Maybe<Device>> {
        console.log("DeviceResolver: getById" + id)
        this.devices = await db.query(sql `
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
            where id = ${id}
        `);
        return this.devices[0];
    }

    @FieldResolver(is => User, {description: ''})
    async createdBy(@Root() device: Device): Promise<User> {
        console.log("DeviceResolver: lade User nach")
        this.users = await db.query(sql`
            select id,email,password,"hasActiveConnection","lastAuthenticated","createdBy","invitationSent","invitationSentBy","isDisabled",added,changed,"usesAuthEmailProxy",hid,preferences,"emailValidated","hasMobileDevices" from fm.user
            where id = ${device.user}
        `);
        return this.users[0];
    }

    @FieldResolver(is => Token, {description: ''})
    async token(@Root() device: Device): Promise<Token> {
        console.log("DeviceResolver: lade Token nach")
        this.tokens = await db.query(sql`
            select id,
                   name,
                   value,
                   "lastUsed",
                   "user",
                   added,
                   changed,
                   hid
            from fm.token
            where id = ${device.token}
        `);
        return this.tokens[0];
    }

}