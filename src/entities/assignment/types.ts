export type AssignmentType = {
    id?: string;
    name: string;
    points: string;
    totalPoints: string;
    weight: string;
    courseId?: string;
}

export interface AssignmentUpdate {
    name?: string;
    points?: string;
    totalPoints?: string;
    weight?: string;
}