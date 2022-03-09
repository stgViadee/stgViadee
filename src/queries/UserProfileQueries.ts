import db, {sql} from '../dbconfig/dbconfig';

export function getUserProfileByStaffMemberId(id : string) {
    return db.query(sql`
        select "userProfile".*
        from fm."userProfile" INNER JOIN
             fm."user" ON "userProfile"."user" = "user"."id" INNER JOIN
             fm."staffMember" ON "staffMember"."user" = "user"."id" INNER JOIN
             fm."fair" ON "staffMember".fair = fair.id AND
                          "fair".organization = "userProfile".organization
        where "staffMember".id = ${id}
    `);
}

export function getUserProfileByUserId(userId : string) {
    return db.query(sql`
        select "userProfile".*
        from fm."userProfile"
        where "userProfile"."user" = ${userId}
    `);
}

export function getUserProfileByUserIdCount(userId : string) {
    return db.query(sql`
        select count("userProfile".*) as anzahl
        from fm."userProfile"
        where "userProfile"."user" = ${userId}
    `);
}

export function getUserProfileByUserIdPaginated(userId : string, bounds : any) {
    return db.query(sql`
        select "userProfile".* as anzahl
        from fm."userProfile"
        where "userProfile"."user" = ${userId}
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}









