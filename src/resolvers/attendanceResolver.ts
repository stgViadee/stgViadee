import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import db, {sql} from '../dbconfig/dbconfig';
import {Attendance} from '../schemas/Attendance';

@Resolver((of) => Attendance)
export class AttendanceResolver {
    private attendances: Attendance[] = []

    // @ts-ignore
    @Query((returns) => [Attendance], { nullable: true })
    async getAttendances(): Promise<Attendance[]> {
        console.log("AttendanceResolver: getAll")
        this.attendances = await db.query(sql `
            SELECT id, meeting, attendance.user
            FROM fm.attendance
        `);
        return this.attendances;
    }

}