import db, {sql} from '../dbconfig/dbconfig';

export function getAllDevices() {
    return db.query(sql`
        select *
        from fm.device
    `);
}

export function getDeviceById(id: string) {
    return db.query(sql`
        select *
        from fm.device
        where id = ${id}
    `);
}






