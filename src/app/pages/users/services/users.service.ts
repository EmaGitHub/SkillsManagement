import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Competence } from "../models/Competence";
import { User } from "../models/User";

@Injectable()
export class UsersService {

    constructor(private httpClient: HttpClient) {}

    public getUsers(): Observable<User[]> {
        return this.httpClient.get<any>("user");
    }

    public getUserInfo(id: number): Observable<User> {
        return this.httpClient.get<User>(`user/${id}`);
    }

    public addUserCompetence(competence: Competence): Observable<any> {
        return this.httpClient.post<any>(`skill`, competence);
    }

    public getUserCompetences(userId: number): Observable<Competence[]> {
        return this.httpClient.get<any>(`skill/list/${userId}`);
    }
}