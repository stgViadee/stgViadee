import db, {sql} from '../dbconfig/dbconfig';

export function getFairProductAvailabilitiesByFairProductIdCount(fairProductId : string) {
    return db.query(sql `
        SELECT count(*) as anzahl FROM fm."fairProductAvailability"
        where "fairProduct" = ${fairProductId}
    `);
}

export function getFairProductAvailabilitiesByFairProductIdPaginated(fairProductId : string, bounds : any) {
    return db.query(sql`
        SELECT * FROM fm."fairProductAvailability"
        where "fairProduct" = ${fairProductId}
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}




