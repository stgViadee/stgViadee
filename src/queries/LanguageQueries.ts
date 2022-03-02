import db, {sql} from '../dbconfig/dbconfig';

export function getAllLanguages() {
    return db.query(sql `
        select * from fm."language"
    `);
}






