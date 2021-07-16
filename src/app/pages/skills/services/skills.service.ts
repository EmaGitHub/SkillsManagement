import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SkillArea } from "../models/skill-area.model";
import { Skill } from "../models/skill.model";

@Injectable()
export class SkillsService {

    constructor(private httpClient: HttpClient) {}

    public getSkills(): Observable<Skill> {
        return this.httpClient.get<any>("skill")
    }

    public getSkillAreas(): Observable<SkillArea[]> {
        return this.httpClient.get<SkillArea[]>("skill/area")
    }

    public addSkill(skill: any): Observable<Skill> {
        return this.httpClient.post<any>("skill", skill)
    }

    public addSkillArea(skillAreaName: string): Observable<SkillArea> {
        let skillArea = {name: skillAreaName}
        return this.httpClient.post<any>("skill/area", skillArea)
    }
}