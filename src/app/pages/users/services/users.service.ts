import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/User";

@Injectable()
export class UsersService {

    constructor(private httpClient: HttpClient) {}

    public getUsers(): Observable<User[]> {
        return this.httpClient.get<any>("user")
    }

}