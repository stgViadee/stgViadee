import db, {sql} from '../dbconfig/dbconfig';


export function getProductGroupByPrinterIdCount(printerId : string) {
    return db.query(sql`
        SELECT
            count("productGroup".*) as anzahl
        FROM
            fm."productGroup" INNER JOIN
            fm."printerResponsibilities" ON "productGroup".id = "printerResponsibilities"."productGroup" AND
                                            "printerResponsibilities".printer = ${printerId}
        `);
}

export function getProductGroupByPrinterIdPaginated(printerId : string, bounds : any) {
    return db.query(sql`
        SELECT
            "productGroup".*
        FROM
            fm."productGroup" INNER JOIN
            fm."printerResponsibilities" ON "productGroup".id = "printerResponsibilities"."productGroup" AND
                                            "printerResponsibilities".printer = ${printerId}
        order by "productGroup".id asc
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}





