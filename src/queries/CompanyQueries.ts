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






