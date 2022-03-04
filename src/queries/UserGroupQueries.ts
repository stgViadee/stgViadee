import db, {sql} from '../dbconfig/dbconfig';

export function getAllUserGroups() {
    return db.query(sql`
        select *
        from fm."userGroup"
    `);
}

export function getUserGroupMemberByUserGroupIdCount(userGroupId: string) {
    return db.query(sql`
        select count("user".*) as anzahl
        from fm."user"
                 INNER JOIN
             fm."userGroupMembership" on "user".id = "userGroupMembership"."user"
        WHERE "userGroupMembership"."userGroup" = ${userGroupId}
    `);
}

export function getUserGroupMemberByUserGroupIdPaginated(userGroupId: string, bounds : any) {
    return db.query(sql`
        select "user".*
        from fm."user"
                 INNER JOIN fm."userGroupMembership" on "user".id = "userGroupMembership"."user"
        WHERE "userGroupMembership"."userGroup" = ${userGroupId}
        order by "user".id asc
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}


export function getUserGroupsByOrganizationIdCount(organizationId: string) {
    return db.query(sql`
        select count("userGroup".*) as anzahl
        from fm."userGroup"
        WHERE "userGroup".organization = ${organizationId}
    `);
}

export function getUserGroupsByOrganizationIdPaginated(organizationId: string, bounds : any) {
    return db.query(sql`
        select "userGroup".*
        from fm."userGroup"
        WHERE "userGroup".organization = ${organizationId} 
        order by "userGroup".id asc
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}










