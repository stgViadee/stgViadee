import db, {sql} from '../dbconfig/dbconfig';

export function getConversationsByUserIdFilteredCount(userId : string, fairId: string, organizationId: string) {
    return db.query(sql `
        SELECT
            count (*) as anzahl 
        FROM
            fm.conversation INNER JOIN
            fm."user" ON (conversation."user" = "user".id OR conversation."recipient" = "user".id) INNER JOIN
            fm."userGroupMembership" ON "user".id = "userGroupMembership"."user" INNER JOIN
            fm."userGroup" ON ("userGroupMembership"."userGroup" = "userGroup".id AND
                               COALESCE(${fairId}, "userGroup".fair) = "userGroup".fair AND
                               COALESCE(${organizationId}, "userGroup".organization) = "userGroup".organization)
        WHERE 
            conversation.user = ${userId} OR conversation.recipient = ${userId}
    `);
}

export function getConversationsByUserIdFiltered(userId : string, fairId: string, organizationId: string, bounds : any) {
    return db.query(sql `
        SELECT
           conversation.*
        FROM
            fm.conversation INNER JOIN
            fm."user" ON (conversation."user" = "user".id OR conversation."recipient" = "user".id) INNER JOIN
            fm."userGroupMembership" ON "user".id = "userGroupMembership"."user" INNER JOIN
            fm."userGroup" ON ("userGroupMembership"."userGroup" = "userGroup".id AND
                               COALESCE(${fairId}, "userGroup".fair) = "userGroup".fair AND
                               COALESCE(${organizationId}, "userGroup".organization) = "userGroup".organization)
        WHERE 
            conversation.user = ${userId} OR conversation.recipient = ${userId}
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}

    `);
}






