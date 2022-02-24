import db, {sql} from '../dbconfig/dbconfig';

export function getFairDeviceById(id : string) {
    return db.query(sql`
            SELECT * FROM fm."fairDevice"
            WHERE id = ${id}
        `);
}

export function getFairDeviceByDeviceId(deviceId : string) {
    return db.query(sql`
            SELECT * FROM fm."fairDevice"
            WHERE device = ${deviceId}
        `);
}

export function getFairDeviceByFairIdCount(fairId : string) {
    return db.query(sql`
            SELECT count(*) as anzahl FROM fm."fairDevice"
            WHERE fair = ${fairId}
        `);
}

export function getFairDeviceByFairIdPaginated(fairId : string, bounds: any) {
    return db.query(sql`
            SELECT * FROM fm."fairDevice"
            WHERE fair = ${fairId}
            order by "fairDevice".id asc
                LIMIT ${bounds.limit}
            OFFSET ${bounds.offset}
        `);
}


