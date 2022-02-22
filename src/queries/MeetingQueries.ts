import db, {sql} from '../dbconfig/dbconfig';

export function getAllMeetings() {
    return db.query(sql `
        select * from fm.meeting
    `);
}

export function getMeetingById(id : string) {
    return db.query(sql `
        select * from fm.meeting
        where id = ${id}
    `);
}






