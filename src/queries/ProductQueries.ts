import db, {sql} from '../dbconfig/dbconfig';


export function getProductById(id : string) {
    return db.query(sql `
        SELECT * FROM fm.product
        where id = ${id}
    `);
}





