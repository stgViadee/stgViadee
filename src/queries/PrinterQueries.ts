import db, {sql} from '../dbconfig/dbconfig';

export function getAllPrinters() {
    return db.query(sql `
        SELECT * FROM fm.printer
    `);
}

export function getPrinterById(id : string) {
    return db.query(sql `
        SELECT * FROM fm.printer
        where id = ${id}
    `);
}

export function getPrinterByIds(ids : Readonly<string[]>) {
    return db.query(sql `
        SELECT * FROM fm.printer
        where id = ANY (${ids}::uuid[])
    `);
}


export function getPrinterByFairIdCount(fairId : string) {
    return db.query(sql`
            select count(*) as anzahl from "fm"."printer"
            where fair = ${fairId} 
    `);
}

export function getPrinterByFairIdPaginated(fairId : string, bounds : any) {
    return db.query(sql`
            select * from "fm"."printer"
            where fair = ${fairId} 
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}




