import db, {sql} from '../dbconfig/dbconfig';

export function getAllFairs() {
    return db.query(sql`
        select *
        from fm.fair
    `);
}

export function getFairById(id: string) {
    return db.query(sql`
        select *
        from fm.fair
        where id = ${id}
    `);
}

export function getFairsByOrganizationIdCount(organizationId: string) {
    return db.query(sql`
        select count(*) as anzahl
        from fm.fair
        where organization = ${organizationId}
    `);
}

export function getFairsByOrganizationIdPaginated(organizationId: string, bounds: any) {
    return db.query(sql`
        select *
        from fm.fair
        where organization = ${organizationId} LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}


export function getFairsByIdArray(ids: Readonly<string[]>) {
    return db.query(sql`
        select *
        from fm.user
        where id = ANY (${ids}::uuid[])
    `);
}




