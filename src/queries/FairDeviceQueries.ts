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


