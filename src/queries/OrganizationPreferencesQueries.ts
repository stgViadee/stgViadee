import db, {sql} from '../dbconfig/dbconfig';

export function getOrganizationPreferencesById(id : any) {
    return db.query(sql`
        select * from fm."organizationPreferences"
        where id = ${id}
    `);
}






