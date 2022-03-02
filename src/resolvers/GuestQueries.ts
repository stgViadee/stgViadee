import db, {sql} from '../dbconfig/dbconfig';

export function getGuestsByMeetingId(meetingId : string) {
    return db.query(sql`
        SELECT "guest".*
        FROM fm."guest" 
        WHERE "guest".meeting = ${meetingId}
    `);
}