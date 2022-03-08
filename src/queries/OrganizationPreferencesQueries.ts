import db, {sql} from '../dbconfig/dbconfig';

export function getOrganizationPreferencesById(id : any) {
    return db.query(sql`
        select * from fm."organizationPreferences"
        where id = ${id}
    `);
}

export function getProfileEditModeOfStaffMemberOrganization(staffMemberId : any) {
    return db.query(sql`
        SELECT "organizationPreferences".data::json -> 'profileEditMode' as profileEditMode
        FROM
            fm."organizationPreferences" INNER JOIN
            fm."organization" ON "organizationPreferences".id = organization.preferences INNER JOIN
            fm.fair ON organization.id = fair.organization INNER JOIN
            fm."staffMember" ON fair.id = "staffMember".fair
        where
            "staffMember".id = ${staffMemberId}
    `);
}







