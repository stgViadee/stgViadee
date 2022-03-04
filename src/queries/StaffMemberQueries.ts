import db, {sql} from '../dbconfig/dbconfig';


export function getStaffMemberByFairIdCount(fairId: string) {
    return db.query(sql`
        SELECT count(*) as anzahl
        FROM
            fm."staffMember"
        where "staffMember".fair = ${fairId}
    `);
}

export function getStaffMemberByFairIdPaginated(fairId: string, bounds: any) {
    return db.query(sql`
        SELECT *
        FROM
            fm."staffMember"
        where "staffMember".fair = ${fairId}
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}

export function getCompaniesByOrganizationIdCount(organizationId: string) {
    return db.query(sql`
        SELECT count(*) as anzahl
        FROM
            fm."company"
        where "company".organization = ${organizationId}
    `);
}

export function getCompaniesByOrganizationIdPaginated(organizationId: string, bounds: any) {
    return db.query(sql`
        SELECT *
        FROM
            fm."company"
        where "company".organization = ${organizationId}
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}







