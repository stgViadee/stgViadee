import db, {sql} from '../dbconfig/dbconfig';

export function getCreditsByOrganizationIdCount(organizationId: string) {
    return db.query(sql`
        select count("credit".*) as anzahl
        from fm."credit"
        WHERE "credit".organization = ${organizationId}
    `);
}

export function getCreditsByOrganizationIdPaginated(organizationId: string, bounds : any) {
    return db.query(sql`
        select "credit".*
        from fm."credit"
        WHERE "credit".organization = ${organizationId} 
        order by "credit".id asc
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}










