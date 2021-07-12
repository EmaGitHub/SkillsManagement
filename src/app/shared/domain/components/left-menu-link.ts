export interface LeftMenuLink {

    id: string,
    label: string;
    isNavigable: boolean;
    level: number,
    roles?: number[],
    url?: string,
    icon?: string,
    children?: Array<LeftMenuLink>;

}