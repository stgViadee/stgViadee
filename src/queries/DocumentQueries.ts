import db, {sql} from '../dbconfig/dbconfig';

export function getDocumentsByFileStoreByUserIdCount(userId : string) {
    return db.query(sql`
        SELECT count(d.*) as anzahl FROM
            fm.document d INNER JOIN
            fm."fileStoreDocuments" fsd on fsd.document = d.id INNER JOIN
            fm."fileStore" fs ON fsd."fileStore" = fs.id  AND fs."user" = '${userId}'
    `);
}

export function getDocumentsByFileStoreByUserPaginated(userId : string, bounds : any) {
    return db.query(sql`
        SELECT d.* as anzahl FROM
            fm.document d INNER JOIN
            fm."fileStoreDocuments" fsd on fsd.document = d.id INNER JOIN
            fm."fileStore" fs ON fsd."fileStore" = fs.id  AND fs."user" = '${userId}'
        order by d.id asc
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}

