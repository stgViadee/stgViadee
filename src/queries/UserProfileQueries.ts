import db, {sql} from '../dbconfig/dbconfig';

export function getUserById(id : any) {
    return db.query(sql`
        select * from fm.user
        where id = ${id}
    `);
}


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









