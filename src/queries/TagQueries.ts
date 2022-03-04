import db, {sql} from '../dbconfig/dbconfig';


export function getTagsByOrganizationIdCount(organizationId: string) {
    return db.query(sql`
        SELECT count(*) as anzahl
        FROM
            fm."tag"
        where "tag".organization = ${organizationId}
    `);
}

export function getTagsByOrganizationIdPaginated(organizationId: string, bounds: any) {
    return db.query(sql`
        SELECT *
        FROM
            fm."tag"
        where "tag".organization = ${organizationId}
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}






