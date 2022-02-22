import db, {sql} from '../dbconfig/dbconfig';

export function getAllBooths() {
    return db.query(sql `
        SELECT * FROM fm.booth
    `);
}

export function getBoothById(id : string) {
    return db.query(sql `
        SELECT * FROM fm.booth
        where id = ${id}
    `);
}

export function getBoothByFairIdCount(fairId : string) {
    return db.query(sql`
            select count(*) as anzahl from fm.booth
            where fair = ${fairId}  
        `);
}

export function getBoothByFairIdPaginated(fairId : string, bounds : any) {
    return db.query(sql`
        select * from fm.booth
        where fair = ${fairId}
        order by id asc
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}




