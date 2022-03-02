import db, {sql} from '../dbconfig/dbconfig';

export function getAllFairProducts() {
    return db.query(sql `
        SELECT * FROM fm."fairProduct"
    `);
}

export function getFairProductById(id : string) {
    return db.query(sql `
        SELECT * FROM fm."fairProduct"
        where id = ${id}
    `);
}

export function getFairProductByFairIdCount(fairId : string) {
    return db.query(sql`
            select count(*) as anzahl from "fm"."fairProduct"
            where fair = ${fairId} 
    `);
}

export function getFairProductByFairIdPaginated(fairId : string, bounds : any) {
    return db.query(sql`
            select * from "fm"."fairProduct"
            where fair = ${fairId} 
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}




