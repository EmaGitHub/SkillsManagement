import { SkillItem } from "./skill-item";

export interface SkillArea extends SkillItem {
    name: string,
    parentId: number
}