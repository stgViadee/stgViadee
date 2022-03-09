import db, {sql} from '../dbconfig/dbconfig';

export function getAllLanguages() {
    return db.query(sql `
        select * from fm."language"
    `);
}

export function getLanguagesByUserProfileId(userProfileId: string) {
    return db.query(sql `
        select "language".* 
        from 
            fm."language" INNER JOIN
            fm."userProfileLanguages" ON "userProfileLanguages".language = "language".id AND 
                                        "userProfileLanguages"."userProfile" = ${userProfileId}
    `);
}






