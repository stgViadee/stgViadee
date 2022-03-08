import db, {sql} from '../dbconfig/dbconfig';


export function getPreferencesById(id : any) {
    return db.query(sql`
        select * from fm."preferences"
        where id = ${id}
    `);
}






