export type AssignmentType = {
    id?: string;
    name: string;
    points: string;
    totalPoints: string;
    weight: string;
}

export interface AssignmentUpdate {
    name?: string;
    points?: string;
    totalPoints?: string;
    weight?: string;
}