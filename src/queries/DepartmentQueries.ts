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

export function getDepartmentsByUserProfileIdCount(userProfileId: string) {
    return db.query(sql`
        SELECT count(distinct "department".*) as anzahl
        FROM
            fm."department" INNER JOIN
            fm."userProfileDepartments" ON "userProfileDepartments".department = "department".id AND 
                                    "userProfileDepartments"."userProfile" = ${userProfileId}
    `);
}

export function getDepartmentsByUserProfileIdPaginated(organizationId: string, bounds: any) {
    return db.query(sql`
        SELECT "department".*
        FROM
            fm."department" INNER JOIN
            fm."userProfileDepartments" ON "userProfileDepartments".department = "department".id AND
                                    "userProfileDepartments"."userProfile" = ${organizationId}
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}









