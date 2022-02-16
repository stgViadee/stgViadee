import {Arg, FieldResolver, Maybe, Query, Resolver, Root} from 'type-graphql';
import {Booth} from '../schemas/Booth';
import db, {sql} from '../dbconfig/dbconfig';
import {Fair} from '../schemas/Fair';

@Resolver((of) => Booth)
export class BoothResolver {
    private booths: Booth[] = []
    private fairs: Fair[] = []

    @Query((returns) => [Booth], { nullable: true })
    async getBooths(): Promise<Booth[]> {
        console.log("BoothResolver: getAll")
        this.booths = await db.query(sql `
            SELECT id, name, hall, fair, added, changed, hid
            FROM fm.booth
        `);
        return this.booths;
    }

    @Query((returns) => Booth, { nullable: true })
    async booth(@Arg("id") id : string): Promise<Maybe<Booth>> {
        console.log("BoothResolver: getById" + id)
        this.booths = await db.query(sql `
            SELECT id, name, hall, fair, added, changed, hid
            FROM fm.booth
            where id = ${id}
        `);
        return this.booths[0];
    }

    @FieldResolver(is => Fair, {description: ''})
    async fair(@Root() booth: Booth): Promise<Fair> {
        console.log("BoothResolver: lade Fair nach")
        this.fairs = await db.query(sql`
            select id,name,timezone,author,features,organization,added,changed,hid from fm.fair
            where id = ${booth.fair}
        `);
        return this.fairs[0];
    }

}