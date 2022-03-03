import db, {sql} from '../dbconfig/dbconfig';


export function getRsvpStateByMeetingId(meetingId : string) {
    return db.query(sql `
        select * from fm."rsvpState"
        where meeting = ${meetingId}
    `);
}
