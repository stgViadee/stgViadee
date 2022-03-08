import db, {sql} from '../dbconfig/dbconfig';

export function getCoveredRoomsByPrinterIdCount(printerId : string) {
    return db.query(sql`
            select count(*) as anzahl from fm."coveredRooms"
            where "printer" = ${printerId}  
        `);
}

export function getCoveredRoomsByPrinterIdPaginated(printerId : string, bounds : any) {
    return db.query(sql`
        select * from fm."coveredRooms"
        where "printer" = ${printerId}
        order by id asc
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}




