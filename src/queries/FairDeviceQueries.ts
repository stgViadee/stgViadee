import db, {sql} from '../dbconfig/dbconfig';

export function getFairDeviceById(id : string, actorId: string) {
    return db.query(sql`
        SELECT
            "fairDevice".*
        FROM
            fm."fairDevice" INNER JOIN
            fm."device" ON
                "fairDevice".device = device.id
        WHERE (SELECT count(*) FROM
            ((SELECT "userGroupMembership"."userGroup" FROM fm."userGroupMembership" WHERE "userGroupMembership"."user" = "device".user)
               INTERSECT
               (SELECT "userGroupMembership"."userGroup" FROM fm."userGroupMembership" WHERE "userGroupMembership"."user" = ${actorId})
              ) orgIntersection) > 0
            AND id = ${id}
        `);
}

export function getFairDeviceByDeviceId(deviceId : string, actorId: string) {
    return db.query(sql`
        SELECT
            "fairDevice".*
        FROM
            fm."fairDevice" INNER JOIN
            fm."device" ON
                "fairDevice".device = device.id
        WHERE (SELECT count(*) FROM
            ((SELECT "userGroupMembership"."userGroup" FROM fm."userGroupMembership" WHERE "userGroupMembership"."user" = "device".user)
             INTERSECT
             (SELECT "userGroupMembership"."userGroup" FROM fm."userGroupMembership" WHERE "userGroupMembership"."user" = ${actorId})
            ) orgIntersection) > 0
            AND device = ${deviceId}
        `);
}

export function getFairDeviceByFairIdCount(fairId : string, actorId: string) {
    return db.query(sql`
            SELECT count(*) as anzahl 
            FROM
            fm."fairDevice" INNER JOIN
            fm."device" ON
                "fairDevice".device = device.id
            WHERE (SELECT count(*) FROM
                ((SELECT "userGroupMembership"."userGroup" FROM fm."userGroupMembership" WHERE "userGroupMembership"."user" = "device".user)
                INTERSECT
                (SELECT "userGroupMembership"."userGroup" FROM fm."userGroupMembership" WHERE "userGroupMembership"."user" = ${actorId})
                ) orgIntersection) > 0
            AND fair = ${fairId}
        `);
}

export function getFairDeviceByFairIdPaginated(fairId : string, actorId: string, bounds: any) {
    return db.query(sql`
            SELECT *
            FROM
                fm."fairDevice" INNER JOIN
                fm."device" ON
                    "fairDevice".device = device.id
            WHERE (SELECT count(*) FROM
                ((SELECT "userGroupMembership"."userGroup" FROM fm."userGroupMembership" WHERE "userGroupMembership"."user" = "device".user)
                 INTERSECT
                 (SELECT "userGroupMembership"."userGroup" FROM fm."userGroupMembership" WHERE "userGroupMembership"."user" = ${actorId})
                ) orgIntersection) > 0
            AND fair = ${fairId}
            order by "fairDevice".id asc
                LIMIT ${bounds.limit}
            OFFSET ${bounds.offset}
        `);
}

export function getConversationsByIdArray(ids : Readonly<string[]>) {
    return db.query(sql`
        select * from fm.conversation
        where id = ANY (${ids}::uuid[])
    `);
}


