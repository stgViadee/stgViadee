import {Resolver, FieldResolver, Root} from 'type-graphql';
import db, {sql} from '../dbconfig/dbconfig';
import {Fair} from '../schemas/Fair';
import {FairDay} from '../schemas/FairDay';

@Resolver((of) => FairDay)
export class FairDayResolver {

    private fairs: Fair[] = [];

    @FieldResolver(is => Fair, {description: ''})
    async fair(@Root() fairDay: FairDay): Promise<Fair> {
        this.fairs = await db.query(sql`
            select * from fm.fair
            where id = ${fairDay.fair}
        `);
        return this.fairs[0];
    }

}