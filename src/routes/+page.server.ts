import { getFacultyRecordList } from "$lib/server/db-helpers";

export async function load() {
    const facultyRecordList = await getFacultyRecordList();
    return { facultyRecordList }
}
