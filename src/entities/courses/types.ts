import { AssignmentType } from "../assignment";

export type CourseType = {
    id?: string;
    abbr: string; 
    name: string; 
    credits: number;
    color: string;
    percent: number;
    assignments: AssignmentType[];
}