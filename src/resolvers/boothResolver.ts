import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import {Booth} from '../schemas/Booth';
import db, {sql} from '../dbconfig/dbconfig';

@Resolver((of) => Booth)
export class BoothResolver {
    private booths: Booth[] = []

    // @ts-ignore
    @Query((returns) => [Booth], { nullable: true })
    async getBooths(): Promise<Booth[]> {
        console.log("BoothResolver: getAll")
        this.booths = await db.query(sql `
            SELECT id, name, hall, fair, added, changed, hid
            FROM fm.booth
        `);
        return this.booths;
    }

}