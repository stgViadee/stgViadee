import db, {sql} from '../dbconfig/dbconfig';

export function getAllDepartments() {
    return db.query(sql `
        select * from fm.department
    `);
}

export function getDepartmentById(id : string) {
    return db.query(sql `
        select * from fm.department
        where id = ${id}
    `);
}

export function getDepartmentsByOrganizationIdCount(organizationId: string) {
    return db.query(sql`
        SELECT count(*) as anzahl
        FROM
            fm."department"
        where "department".organization = ${organizationId}
    `);
}

export function getDepartmentsByOrganizationIdPaginated(organizationId: string, bounds: any) {
    return db.query(sql`
        SELECT *
        FROM
            fm."department"
        where "department".organization = ${organizationId}
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}









