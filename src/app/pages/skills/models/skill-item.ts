export interface SkillItem {
    id?: number,
    label?: string;
    isArea?: boolean;
    children?: Array<SkillItem>;
}