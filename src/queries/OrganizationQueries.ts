import db, {sql} from '../dbconfig/dbconfig';
import {convertFromGlobalId} from '../schemas/relay/GlobalIdHandler';

export function getAllOrganizations() {
    return db.query(sql`
        select *
        from fm.organization
    `);
}

export function getOrganizationById(id: any) {
    return db.query(sql`
        select *
        from fm.organization
        where id = ${id}
    `);
}

export function getOrganizationsByIdArray(ids: Readonly<string[]>) {
    return db.query(sql`
        select *
        from fm.organization
        where id = ANY (${ids}::uuid[])
    `);
}

export function isStaffMemberOrganizationsAdmin(staffMemberId: string) {
    return db.query(sql`
        SELECT count("userGroup".*) > 0 as userIsOrganizationAdmin
        FROM fm."userGroup"
                 INNER JOIN
             fm."userGroupMembership" ON "userGroup".id = "userGroupMembership"."userGroup" AND
                                         "userGroup"."type" = '00000000-0000-4000-a000-000000000000'
                 INNER JOIN
             fm.fair ON "fair".organization = "userGroup"."organization"
                 INNER JOIN
             fm."staffMember" ON fair.id = "staffMember".fair AND
                                 "staffMember"."user" = "userGroupMembership"."user"
        where "staffMember".id = ${staffMemberId}
    `);
}

export function getOrganizationByUserIdForActorCount(userId: string, filter: any, actorId: string) {
    let idFilter;
    let nameFilter;
    if (filter.id){
        idFilter = convertFromGlobalId(filter.id).id;
    }
    if (filter.name){
        nameFilter = filter.name;
    }
    return db.query(sql`
        select count(*) as anzahl
        from fm."organization"
        where COALESCE(${idFilter}, "organization".id) = "organization".id
          AND COALESCE(${nameFilter}, "organization".name) = "organization".name
          AND (SELECT count(*)
               FROM ((SELECT "userGroup"."organization"
                      FROM fm."userGroupMembership"
                               INNER JOIN fm."userGroup" ON "userGroup".id = "userGroupMembership"."userGroup"
                      WHERE "userGroup".organization = "organization".id
                        AND "userGroupMembership"."user" = ${userId})
                     INTERSECT
                     (SELECT "userGroup"."organization"
                      FROM fm."userGroupMembership"
                               INNER JOIN fm."userGroup" ON "userGroup".id = "userGroupMembership"."userGroup"
                      WHERE "userGroup".organization = "organization".id
                        AND "userGroupMembership"."user" = ${actorId})
                    ) orgIntersection) > 0
    `);
}

export function getOrganizationByUserIdForActorPaginated(userId: string, filter: any,  actorId: string, bounds: any) {
    let idFilter;
    let nameFilter;
    if (filter.id){
        idFilter = convertFromGlobalId(filter.id).id;
    }
    if (filter.name){
        nameFilter = filter.name;
    }
    return db.query(sql`
        select *
        from fm."organization"
        where COALESCE(${idFilter}, "organization".id) = "organization".id
          AND COALESCE(${nameFilter}, "organization".name) = "organization".name
          AND (SELECT count(*)
               FROM ((SELECT "userGroup"."organization"
                      FROM fm."userGroupMembership"
                               INNER JOIN fm."userGroup" ON "userGroup".id = "userGroupMembership"."userGroup"
                      WHERE "userGroup".organization = "organization".id
                        AND "userGroupMembership"."user" = ${userId})
                     INTERSECT
                     (SELECT "userGroup"."organization"
                      FROM fm."userGroupMembership"
                               INNER JOIN fm."userGroup" ON "userGroup".id = "userGroupMembership"."userGroup"
                      WHERE "userGroup".organization = "organization".id
                        AND "userGroupMembership"."user" = ${actorId})
                    ) orgIntersection) > 0
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}




