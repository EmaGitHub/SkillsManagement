import { User } from "./User";

export interface Competence {
    competenceId: number, 
    competenceName?: string,
    user: User, 
    level?: number,
    selfLevel?: number,
    maxLevel?: number,
    validationUserId: number,
    validationDate?: Date
}