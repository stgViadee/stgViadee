import db, {sql} from '../dbconfig/dbconfig';

export function getAllCompanies() {
    return db.query(sql `
        select * FROM fm.company
    `);
}

export function getCompanyById(id : string) {
    return db.query(sql `
        select * FROM fm.company
        where id = ${id}
    `);
}

export function getCompaniesByUserProfileIdCount(userProfileId: string) {
    return db.query(sql`
        SELECT count(distinct "company".*) as anzahl
        FROM
            fm."company" INNER JOIN
            fm."userProfileCompanies" ON "userProfileCompanies".company = "company".id AND 
                                    "userProfileCompanies"."userProfile" = ${userProfileId}
    `);
}

export function getCompaniesByUserProfileIdPaginated(organizationId: string, bounds: any) {
    return db.query(sql`
        SELECT "company".*
        FROM
            fm."company" INNER JOIN
            fm."userProfileCompanies" ON "userProfileCompanies".company = "company".id AND
                                    "userProfileCompanies"."userProfile" = ${organizationId}
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}






