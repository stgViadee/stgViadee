import db, {sql} from '../dbconfig/dbconfig';

export function getLicensingByOrganizationId(organizationId: string) {
    return db.query(sql`
        SELECT *
        FROM
            fm."licensing"
        where "licensing".organization = ${organizationId}
    `);
}






