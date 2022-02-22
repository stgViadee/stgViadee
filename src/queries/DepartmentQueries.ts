import db, {sql} from '../dbconfig/dbconfig';

export function getAllDepartments() {
    return db.query(sql `
        select * from fm.department
    `);
}

export function getDepartmentById(id : string) {
    return db.query(sql `
        select * from fm.department
        where id = ${id}
    `);
}






