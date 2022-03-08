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

export function getMeetingByFairIdFilteredCount(fairId : string, filter: any) {
    return db.query(sql`
            select count(*) as anzahl 
            from fm.meeting INNER JOIN 
                 fm."fairResource" ON meeting.resource = "fairResource".id AND 
                                        "fairResource".fair = ${fairId}
            WHERE
                (meeting.start > ${filter.start_gt} OR COALESCE(${filter.start_gt},meeting.start) = meeting.start) AND 
                (meeting.start >= ${filter.start_gte} OR COALESCE(${filter.start_gte},meeting.start) = meeting.start) AND
                (meeting.start < ${filter.start_lt} OR COALESCE(${filter.start_lt},meeting.start) = meeting.start) AND
                (meeting.start <= ${filter.start_lte} OR COALESCE(${filter.start_lte},meeting.start) = meeting.start) AND
                (meeting.end > ${filter.end_gt} OR COALESCE(${filter.end_gt},meeting.end) = meeting.end) AND 
                (meeting.end >= ${filter.end_gte} OR COALESCE(${filter.end_gte},meeting.end) = meeting.end) AND
                (meeting.end < ${filter.end_lt} OR COALESCE(${filter.end_lt},meeting.end) = meeting.end) AND
                (meeting.end <= ${filter.end_lte} OR COALESCE(${filter.end_lte},meeting.end) = meeting.end)


    `);
}

export function getMeetingByStaffMemberIdFilteredCount(staffMemberId : string, filter: any) {
    return db.query(sql`
            select count(*) as anzahl 
            from fm.meeting INNER JOIN 
                 fm."attendance" ON meeting.id = "attendance".meeting INNER JOIN
                 fm."staffMember" ON "staffMember"."user" = "attendance"."user" AND 
                                     "staffMember".id = ${staffMemberId}
            WHERE
                (meeting.start > ${filter.start_gt} OR COALESCE(${filter.start_gt},meeting.start) = meeting.start) AND 
                (meeting.start >= ${filter.start_gte} OR COALESCE(${filter.start_gte},meeting.start) = meeting.start) AND
                (meeting.start < ${filter.start_lt} OR COALESCE(${filter.start_lt},meeting.start) = meeting.start) AND
                (meeting.start <= ${filter.start_lte} OR COALESCE(${filter.start_lte},meeting.start) = meeting.start) AND
                (meeting.end > ${filter.end_gt} OR COALESCE(${filter.end_gt},meeting.end) = meeting.end) AND 
                (meeting.end >= ${filter.end_gte} OR COALESCE(${filter.end_gte},meeting.end) = meeting.end) AND
                (meeting.end < ${filter.end_lt} OR COALESCE(${filter.end_lt},meeting.end) = meeting.end) AND
                (meeting.end <= ${filter.end_lte} OR COALESCE(${filter.end_lte},meeting.end) = meeting.end)


    `);
}

export function getMeetingByStaffMemberIdFilteredPaginated(staffMemberId : string, filter: any, bounds : any) {
    return db.query(sql`
            select meeting.*
            from fm.meeting INNER JOIN
                 fm."attendance" ON meeting.id = "attendance".meeting INNER JOIN
                 fm."staffMember" ON "staffMember"."user" = "attendance"."user" AND
                                     "staffMember".id = ${staffMemberId}
            WHERE
                (meeting.start > ${filter.start_gt} OR COALESCE(${filter.start_gt},meeting.start) = meeting.start) AND
                (meeting.start >= ${filter.start_gte} OR COALESCE(${filter.start_gte},meeting.start) = meeting.start) AND
                (meeting.start < ${filter.start_lt} OR COALESCE(${filter.start_lt},meeting.start) = meeting.start) AND
                (meeting.start <= ${filter.start_lte} OR COALESCE(${filter.start_lte},meeting.start) = meeting.start) AND
                (meeting.end > ${filter.end_gt} OR COALESCE(${filter.end_gt},meeting.end) = meeting.end) AND
                (meeting.end >= ${filter.end_gte} OR COALESCE(${filter.end_gte},meeting.end) = meeting.end) AND
                (meeting.end < ${filter.end_lt} OR COALESCE(${filter.end_lt},meeting.end) = meeting.end) AND
                (meeting.end <= ${filter.end_lte} OR COALESCE(${filter.end_lte},meeting.end) = meeting.end)
            order by meeting."id" asc      
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}

export function getMeetingByFairIdFilteredPaginated(fairId : string, filter: any, bounds : any) {
    return db.query(sql`
            select meeting.*
            from fm.meeting INNER JOIN
                 fm."fairResource" ON meeting.resource = "fairResource".id AND
                                      "fairResource".fair = ${fairId}
            WHERE
                (meeting.start > ${filter.start_gt} OR COALESCE(${filter.start_gt},meeting.start) = meeting.start) AND
                (meeting.start >= ${filter.start_gte} OR COALESCE(${filter.start_gte},meeting.start) = meeting.start) AND
                (meeting.start < ${filter.start_lt} OR COALESCE(${filter.start_lt},meeting.start) = meeting.start) AND
                (meeting.start <= ${filter.start_lte} OR COALESCE(${filter.start_lte},meeting.start) = meeting.start) AND
                (meeting.end > ${filter.end_gt} OR COALESCE(${filter.end_gt},meeting.end) = meeting.end) AND 
                (meeting.end >= ${filter.end_gte} OR COALESCE(${filter.end_gte},meeting.end) = meeting.end) AND
                (meeting.end < ${filter.end_lt} OR COALESCE(${filter.end_lt},meeting.end) = meeting.end) AND
                (meeting.end <= ${filter.end_lte} OR COALESCE(${filter.end_lte},meeting.end) = meeting.end)
            order by meeting."id" asc      
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}

export function getMeetingByResouceIdCount(resourceId : string) {
    return db.query(sql`
            select count(*) as anzahl 
            from fm.meeting INNER JOIN 
                 fm."fairResource" ON meeting.resource = ${resourceId}
    `);
}

export function getMeetingByResourceIdPaginated(resourceId : string, bounds : any) {
    return db.query(sql`
            select meeting.*
            from fm.meeting INNER JOIN
                 fm."fairResource" ON meeting.resource = ${resourceId}
            order by meeting."id" asc      
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}

export function isStaffMemberAttendingMeetings(staffMemberId : string) {
    return db.query(sql`
        SELECT count(*) > 0 as hasScheduledMeetings
        FROM
            fm.attendance INNER JOIN
            fm."staffMember" ON attendance."user" = "staffMember"."user" INNER JOIN
            fm."meeting" ON attendance.meeting = meeting.id INNER JOIN
            fm."fairResource" ON meeting.resource = "fairResource".id AND
                                 "fairResource".fair = "staffMember".fair
        where "staffMember".id = ${staffMemberId}
    `);
}

export function isStaffMemberHavingMeetingNow(staffMemberId : string) {
    return db.query(sql`
        SELECT count(*) > 0 as hasMeetingNow
        FROM
            fm.attendance INNER JOIN
            fm."staffMember" ON attendance."user" = "staffMember"."user" INNER JOIN
            fm."meeting" ON attendance.meeting = meeting.id INNER JOIN
            fm."fairResource" ON meeting.resource = "fairResource".id AND
                                 "fairResource".fair = "staffMember".fair
        where "staffMember".id = ${staffMemberId} AND 
            now() between "meeting".start AND "meeting".end
    `);
}






