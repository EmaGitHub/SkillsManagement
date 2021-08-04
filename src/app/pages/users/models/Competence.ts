import { User } from "./User";

export interface Competence {
    skillId: number, 
    user: User, 
    level?: number,
    selfLevel?: number,
    maxLevel?: number,
    validationUserId: number,
    validationDate?: Date
}