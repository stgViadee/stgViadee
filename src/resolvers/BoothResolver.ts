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
        this.booths = await db.query(sql `
            SELECT * FROM fm.booth
        `);
        return this.booths;
    }

    @Query((returns) => Booth, { nullable: true })
    async booth(@Arg("id") id : string): Promise<Maybe<Booth>> {
        this.booths = await db.query(sql `
            SELECT * FROM fm.booth
            where id = ${id}
        `);
        return this.booths[0];
    }

    @FieldResolver(is => Fair, {description: ''})
    async fair(@Root() booth: Booth): Promise<Fair> {
        this.fairs = await db.query(sql`
            select * from fm.fair
            where id = ${booth.fair}
        `);
        return this.fairs[0];
    }

}