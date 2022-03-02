import db, {sql} from '../dbconfig/dbconfig';

export function getMessageByConversationIdCount(conversationId : string) {
    return db.query(sql `
        SELECT
            count (*) as anzahl 
        FROM
            fm.message 
        WHERE 
            message.conversation = ${conversationId}
    `);
}

export function getMessageByConversationId(conversationId : string, bounds : any) {
    return db.query(sql `
        SELECT
            *
        FROM
            fm.message
        WHERE
            message.conversation = ${conversationId}
        ORDER BY message.changed
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}

    `);
}






