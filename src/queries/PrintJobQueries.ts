import db, {sql} from '../dbconfig/dbconfig';

export function getAllPrinters() {
    return db.query(sql `
        SELECT * FROM fm.printer
    `);
}

export function getPrinterById(id : string) {
    return db.query(sql `
        SELECT * FROM fm.printer
        where id = ${id}
    `);
}

export function getPrintJobByOrderIdCount(orderId : string) {
    return db.query(sql`
            select count(*) as anzahl from "fm"."printJob"
            where "printJob".order = ${orderId} 
    `);
}

export function getPrintJobByOrderIdPaginated(orderId : string, bounds : any) {
    return db.query(sql`
            select * from "fm"."printJob"
            where "printJob".order = ${orderId} 
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}

export function getPrintJobByPrinterIdCount(printerId : string) {
    return db.query(sql`
            select count(*) as anzahl from "fm"."printJob"
            where "printJob".printer = ${printerId} 
    `);
}

export function getPrintJobsByPrinterIdsCount(printerIds : Readonly<string[]>, actorId : string) {
    return db.query(sql`
            select count("printJob".*) as anzahl
            from fm."printJob" INNER JOIN
                 fm."order" ON "order"."id" = "printJob"."order" INNER JOIN
                 fm."fair" ON "order"."fair" = "fair"."id" AND
                              "fair".organization IN (SELECT
                                                          "userGroup".organization
                                                      FROM
                                                          fm."userGroupMembership" INNER JOIN
                                                          fm."userGroup" ON "userGroupMembership"."userGroup" = "userGroup".id AND
                                                                            "userGroupMembership".user = ${actorId})
            where "printJob".printer = ANY (${printerIds}::uuid[])
    `);
}

export function getPrintJobByPrinterIdPaginated(printerId : string, bounds : any) {
    return db.query(sql`
            select * from "fm"."printJob"
            where "printJob".printer = ${printerId} 
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}


export function getPrintJobsByPrinterIdsPaginated(printerIds : Readonly<string[]>, actorId : string, bounds : any) {
    return db.query(sql`
            select "printJob".* 
            from fm."printJob" INNER JOIN
                 fm."order" ON "order"."id" = "printJob"."order" INNER JOIN
                 fm."fair" ON "order"."fair" = "fair"."id" AND 
                "fair".organization IN (SELECT
                                            "userGroup".organization
                                        FROM
                                            fm."userGroupMembership" INNER JOIN
                                            fm."userGroup" ON "userGroupMembership"."userGroup" = "userGroup".id AND
                                                              "userGroupMembership".user = ${actorId})
            where "printJob".printer = ANY (${printerIds}::uuid[])
                LIMIT ${bounds.limit}
            OFFSET ${bounds.offset}
    `);
}




