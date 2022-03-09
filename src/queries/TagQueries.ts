import db, {sql} from '../dbconfig/dbconfig';


export function getTagsByOrganizationIdCount(organizationId: string) {
    return db.query(sql`
        SELECT count(*) as anzahl
        FROM
            fm."tag"
        where "tag".organization = ${organizationId}
    `);
}

export function getTagsByOrganizationIdPaginated(organizationId: string, bounds: any) {
    return db.query(sql`
        SELECT *
        FROM
            fm."tag"
        where "tag".organization = ${organizationId}
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}

export function getTagsByUserProfileIdCount(userProfileId: string) {
    return db.query(sql`
        SELECT count(distinct "tag".*) as anzahl
        FROM
            fm."tag" INNER JOIN
            fm."userProfileTags" ON "userProfileTags".tag = "tag".id AND 
                                    "userProfileTags"."userProfile" = ${userProfileId}
    `);
}

export function getTagsByUserProfileIdPaginated(organizationId: string, bounds: any) {
    return db.query(sql`
        SELECT "tag".*
        FROM
            fm."tag" INNER JOIN
            fm."userProfileTags" ON "userProfileTags".tag = "tag".id AND
                                    "userProfileTags"."userProfile" = ${organizationId}
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}






