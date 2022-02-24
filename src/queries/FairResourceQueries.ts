import db, {sql} from '../dbconfig/dbconfig';

export function getAllFairResources() {
    return db.query(sql `
        SELECT * FROM fm.fairResource
    `);
}

export function getFairResourceById(id : string) {
    return db.query(sql `
        SELECT * FROM fm.fairResource
        where id = ${id}
    `);
}

export function getFairResourceByFairIdFilteredCount(fairId : string, filter: any) {
    return db.query(sql`
            select count(*) as anzahl from "fm"."fairResource"
            where fair = ${fairId} AND 
                  COALESCE (${filter.hasCatering_eq}, "fairResource"."hasCatering") = "fairResource"."hasCatering" AND
                  COALESCE (${filter.hasMeetings_eq}, "fairResource"."hasCatering") = "fairResource"."hasMeetings"
    `);
}

export function getFairResourceByFairIdFilteredPaginated(fairId : string, filter: any, bounds : any) {
    return db.query(sql`
            select * from "fm"."fairResource"
            where fair = ${fairId} AND
                    COALESCE (${filter.hasCatering_eq}, "fairResource"."hasCatering") = "fairResource"."hasCatering" AND
                    COALESCE (${filter.hasMeetings_eq}, "fairResource"."hasCatering") = "fairResource"."hasMeetings"
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}




