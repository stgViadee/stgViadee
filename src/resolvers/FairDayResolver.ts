import {Resolver, FieldResolver, Root} from 'type-graphql';
import db, {sql} from '../dbconfig/dbconfig';
import {Fair} from '../schemas/Fair';
import {FairDay} from '../schemas/FairDay';

@Resolver((of) => FairDay)
export class FairDayResolver {

    private fairs: Fair[] = [];

    @FieldResolver(is => Fair, {description: ''})
    async fair(@Root() fairDay: FairDay): Promise<Fair> {
        console.log("FairDayResolver: lade Fair nach")
        this.fairs = await db.query(sql`
            select id,name,timezone,author,features,organization,added,changed,hid from fm.fair
            where id = ${fairDay.fair}
        `);
        return this.fairs[0];
    }

}