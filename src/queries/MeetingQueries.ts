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
            select *
            from fm.meeting INNER JOIN
                 fm."fairResource" ON meeting.resource = ${resourceId}
            order by meeting."id" asc      
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}






