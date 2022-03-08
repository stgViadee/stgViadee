import db, {sql} from '../dbconfig/dbconfig';

export function getAllOrganizations() {
    return db.query(sql`
        select * from fm.organization
    `);
}

export function getOrganizationById(id : any) {
    return db.query(sql`
        select * from fm.organization
        where id = ${id}
    `);
}

export function getOrganizationsByIdArray(ids : Readonly<string[]>) {
    return db.query(sql`
        select * from fm.organization
        where id = ANY (${ids}::uuid[])
    `);
}

export function isStaffMemberOrganizationsAdmin(staffMemberId : string) {
    return db.query(sql`
        SELECT count("userGroup".*) > 0 as userIsOrganizationAdmin
        FROM
            fm."userGroup" INNER JOIN
            fm."userGroupMembership" ON "userGroup".id = "userGroupMembership"."userGroup" AND
                                        "userGroup"."type" = '00000000-0000-4000-a000-000000000000' INNER JOIN
            fm.fair ON "fair".organization = "userGroup"."organization" INNER JOIN
            fm."staffMember" ON fair.id = "staffMember".fair AND
                                "staffMember"."user" = "userGroupMembership"."user"
        where "staffMember".id = ${staffMemberId}
    `);
}




