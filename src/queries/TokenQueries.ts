import db, {sql} from '../dbconfig/dbconfig';

export function getAllTokens() {
    return db.query(sql`
        select *
        from fm.token
    `);
}

export function getTokenById(id: string) {
    return db.query(sql`
        select *
        from fm.token
        where id = ${id}
    `);
}






