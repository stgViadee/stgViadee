import db, {sql} from '../dbconfig/dbconfig';

export function getFairDeviceByIdOrDeviceId(id : string, deviceId : string) {
    return db.query(sql`
            SELECT * FROM fm."fairDevice"
            WHERE id = ${id} OR device = ${deviceId}
        `);
}

