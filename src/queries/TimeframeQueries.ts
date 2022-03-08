import db, {sql} from '../dbconfig/dbconfig';

export function getTimeframesByStaffMemberId(staffMemberId: string) {
    return db.query(sql`
        SELECT *
        FROM
            fm."timeframe"
        where "timeframe"."staffMember" = ${staffMemberId}
    `);
}







