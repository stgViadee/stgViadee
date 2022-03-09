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

export function getUserByIdForActor(id : string, actorId : string) {
    return db.query(sql`
        select * from fm.user
        where id = ${id} AND
            (SELECT count(*) FROM
            ((SELECT "userGroupMembership"."userGroup" FROM fm."userGroupMembership" WHERE "userGroupMembership"."user" = "user".id)
            INTERSECT
            (SELECT "userGroupMembership"."userGroup" FROM fm."userGroupMembership" WHERE "userGroupMembership"."user" = ${actorId})
            ) orgIntersection) > 0
    `);
}

export function getUserByEmailForActor(email : string, actorId : string) {
    return db.query(sql`
        select * from fm.user
        where email = ${email} AND
            (SELECT count(*) FROM
            ((SELECT "userGroupMembership"."userGroup" FROM fm."userGroupMembership" WHERE "userGroupMembership"."user" = "user".id)
            INTERSECT
            (SELECT "userGroupMembership"."userGroup" FROM fm."userGroupMembership" WHERE "userGroupMembership"."user" = ${actorId})
            ) orgIntersection) > 0
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







