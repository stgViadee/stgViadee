import db, {sql} from '../dbconfig/dbconfig';


export function getOrderByFairIdCount(fairId: string) {
    return db.query(sql`
        SELECT count(*) as anzahl
        FROM
            fm."order"
        where "order".fair = ${fairId}
    `);
}

export function getOrderPositionByOrderId(id: string) {
    return db.query(sql`
        SELECT positions
        FROM
            fm."order"
        where id = ${id}
    `);
}

export function getOrderByFairIdPaginated(fairId: string, bounds: any) {
    return db.query(sql`
        SELECT *
        FROM
            fm."order"
        where "order".fair = ${fairId}
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}






