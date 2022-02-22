import db, {sql} from '../dbconfig/dbconfig';

export function getAllOrganizations() {
    return db.query(sql`
        select * from fm.organization
    `);
}

export function getOrganizationById(id : any) {
    return db.query(sql`
        select * from fm.organization
        where id = ${id}
    `);
}

export function getOrganizationsByIdArray(ids : Readonly<string[]>) {
    return db.query(sql`
        select * from fm.organization
        where id = ANY (${ids}::uuid[])
    `);
}




