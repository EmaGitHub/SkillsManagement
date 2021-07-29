import { Role } from "./Role";

export interface User {
    userId?: number,
    username: string, 
    firstName: string,
    lastName: string,
    roles?: Role[],
    token?: string
}