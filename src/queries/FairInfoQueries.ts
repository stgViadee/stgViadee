import db, {sql} from '../dbconfig/dbconfig';

export function getAllFairInfos() {
    return db.query(sql `
        SELECT * FROM fm.fairInfo
    `);
}

export function getFairInfoById(id : string) {
    return db.query(sql `
        SELECT * FROM fm.fairInfo
        where id = ${id}
    `);
}

export function getFairInfoByFairIdFilteredCount(fairId : string, filter: any) {
    return db.query(sql`
            select count(*) as anzahl from "fm"."fairInfo"
            where fair = ${fairId} AND 
                  COALESCE (${filter.type_eq}, "fairInfo"."type") = "fairInfo"."type"
    `);
}

export function getFairInfoByFairIdFilteredPaginated(fairId : string, filter: any, bounds : any) {
    return db.query(sql`
            select * from "fm"."fairInfo"
            where fair = ${fairId} AND
                COALESCE (${filter.type_eq}, "fairInfo"."type") = "fairInfo"."type"
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}




