import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestResponse } from "src/app/shared/domain/http/rest-response";

@Injectable()
export class SkillsService {

    constructor(private httpClient: HttpClient) {}

    public getSkills(): Observable<RestResponse<any>> {
        return this.httpClient.get<any>("skill")
    }

    public getSkillAreas(): Observable<RestResponse<any>> {
        return this.httpClient.get<any>("skill/area")
    }

    public addSkill(skill: any): Observable<RestResponse<any>> {
        return this.httpClient.post<any>("skill", skill)
    }
}