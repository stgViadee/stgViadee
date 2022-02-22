import db, {sql} from '../dbconfig/dbconfig';

export function getAllFairs() {
    return db.query(sql`
            select * from fm.fair
        `);
}

export function getFairById(id : any) {
    return db.query(sql`
            select * from fm.fair
            where id = ${id}
        `);
}

export function getFairsByIdArray(ids : Readonly<string[]>) {
    return db.query(sql`
        select * from fm.user
        where id = ANY (${ids}::uuid[])
    `);
}




