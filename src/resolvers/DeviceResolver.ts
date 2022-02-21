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
        this.devices = await db.query(sql `
            select * from fm.device
        `);
        return this.devices;
    }

    @Query((returns) => Device, { nullable: true })
    async device(@Arg("id") id : string): Promise<Maybe<Device>> {
        this.devices = await db.query(sql `
            select * from fm.device
            where id = ${id}
        `);
        return this.devices[0];
    }

    @FieldResolver(is => User, {description: ''})
    async createdBy(@Root() device: Device): Promise<User> {
        this.users = await db.query(sql`
            select * from fm.user
            where id = ${device.user}
        `);
        return this.users[0];
    }

    @FieldResolver(is => Token, {description: ''})
    async token(@Root() device: Device): Promise<Token> {
        this.tokens = await db.query(sql`
            select * from fm.token
            where id = ${device.token}
        `);
        return this.tokens[0];
    }

}