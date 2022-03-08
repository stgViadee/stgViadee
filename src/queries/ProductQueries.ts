import db, {sql} from '../dbconfig/dbconfig';


export function getProductById(id : string) {
    return db.query(sql `
        SELECT * FROM fm.product
        where id = ${id}
    `);
}

export function getProductByProductGroupIdCount(productGroupId : string) {
    return db.query(sql`
            select count(*) as anzahl from "fm"."product"
            where "product"."productGroup" = ${productGroupId} 
    `);
}

export function getProductByProductGroupIdPaginated(productGroupId : string, bounds : any) {
    return db.query(sql`
            select * from "fm"."product"
            where "product"."productGroup" = ${productGroupId}
                LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}





