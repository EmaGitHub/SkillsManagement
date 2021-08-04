import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SkillArea } from "../models/skill-area.model";
import { Skill } from "../models/skill.model";

@Injectable()
export class SkillsService {

    constructor(private httpClient: HttpClient) {}

    public getSkills(): Observable<Skill[]> {
        return this.httpClient.get<any>("competence")
    }

    public getSkillAreas(): Observable<SkillArea[]> {
        return this.httpClient.get<SkillArea[]>("competence/area")
    }

    public addSkill(skill: any): Observable<Skill> {
        return this.httpClient.post<any>("competence", skill)
    }

    // deprecated
    public addSkillArea(skillAreaName: string): Observable<SkillArea> {
        let skillArea = {name: skillAreaName}
        return this.httpClient.post<any>("competence/area", skillArea)
    }

    public addArea(skillArea: SkillArea): Observable<SkillArea> {
        return this.httpClient.post<any>("competence/area", skillArea)
    }

    public deleteSkill(skillId: number): Observable<any> {
        return this.httpClient.delete<any>("competence/"+skillId);
    }

    public deleteSkillArea(skillAreaId: number): Observable<any> {
        return this.httpClient.delete<any>("competence/area/"+skillAreaId);
    }
}