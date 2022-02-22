import db, {sql} from '../dbconfig/dbconfig';

export function getAllUsers() {
    return db.query(sql`
        select * from fm.user
    `);
}

export function getUserById(id : any) {
    return db.query(sql`
        select * from fm.user
        where id = ${id}
    `);
}

export function getUserAttendingMeetingByMeetingId(meetingId : string) {
    return db.query(sql`
        SELECT "user".*
        FROM fm.user inner join fm.attendance on "user".id = attendance."user"
        WHERE attendance.meeting = ${meetingId}
    `);
}

export function getUsersByIdArray(ids : Readonly<string[]>) {
    return db.query(sql`
        select * from fm.user
        where id = ANY (${ids}::uuid[])
    `);
}






