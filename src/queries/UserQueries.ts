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

export function getUserByOrganizationIdCount(organizationId: string) {
    return db.query(sql`
        SELECT count(*) as anzahl
        FROM
            fm."user" INNER JOIN 
            fm."userProfile" ON "userProfile".user = "user".id AND 
                                "userProfile".organization = ${organizationId}                    
    `);
}

export function getUserByOrganizationIdPaginated(organizationId: string, bounds : any) {
    return db.query(sql`
        SELECT *
        FROM
            fm."user" INNER JOIN 
            fm."userProfile" ON "userProfile".user = "user".id AND 
                                "userProfile".organization = ${organizationId}
        ORDER BY "user".id asc                        
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}







