import db, {sql} from '../dbconfig/dbconfig';



export function getFairDayByFairIdFilteredCount(fairId : string, filter : any) {
    let open_lte = filter && filter.open_lte ? filter.open_lte : null;
    let close_gte = filter && filter.close_gte ? filter.close_gte : null;
    return db.query(sql`
        select count(*) as anzahl from fm."fairDay"
        where fair = ${fairId} AND
            COALESCE(${open_lte}, "fairDay".open) >= "fairDay".open AND
            COALESCE(${close_gte}, "fairDay".close) <= "fairDay".close
    `);
}

export function getFairDayByFairIdPaginated(fairId : string, filter : any, bounds : any) {
    let open_lte = filter && filter.open_lte ? filter.open_lte : null;
    let close_gte = filter && filter.close_gte ? filter.close_gte : null;
    return db.query(sql`
        select * from fm."fairDay"
        where "fairDay".fair = ${fairId} AND
            COALESCE(${open_lte}, "fairDay".open) >= "fairDay".open AND
            COALESCE(${close_gte}, "fairDay".close) <= "fairDay".close
        order by "fairDay".id asc
            LIMIT ${bounds.limit}
        OFFSET ${bounds.offset}
    `);
}

export function getCountOfTodaysFairDays(fairId : string) {
    return db.query(sql`
        select count(*) as anzahl from fm."fairDay"
        where
            "fairDay".fair = ${fairId} AND
            "fairDay".open::date <= now() AND
                "fairDay".close::date >= now();
    `);
}




