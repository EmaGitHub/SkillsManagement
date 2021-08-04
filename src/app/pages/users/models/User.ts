import { Role } from "./Role";

export interface User {
    id?: number,
    username?: string, 
    firstName?: string,
    lastName?: string,
    roles?: Role[],
    token?: string
}