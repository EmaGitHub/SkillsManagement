import { LeftMenuLink } from './../../../shared/domain/components/left-menu-link';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SideMenuService {

    private _navigationToPageSubject$: BehaviorSubject<any> = new BehaviorSubject<any>({ });
    private tree: Array<String>;

    constructor(private httpClient: HttpClient) { 
        this.tree = new Array()
    }

    get navigationTofirstPageSubjectAsObservable(): Observable<string> {
        return this._navigationToPageSubject$.asObservable();
    }

    public pageChoose(sidebarMenuLinkId: string) {
        this.saveSidemenuLinkIdInLocalStorage(sidebarMenuLinkId);
        this._navigationToPageSubject$.next(sidebarMenuLinkId);
    }

    public getSidemenuLinkId(){
        let lastItemSelected: string =  localStorage.getItem('sidemenu-selection');
        console.log("get last sidemenu item selected: "+lastItemSelected);
        return lastItemSelected;
    }

    public getSidemenuAncestorIds(): Array<String>{
        let selectedLinkAncestorsString: string =  localStorage.getItem('sidemenu-selection-tree');
        let parsed = JSON.parse(selectedLinkAncestorsString);
        return parsed;
    }

    public saveSidemenuLinkTreeInLocalStorage(linkTree: Array<String>) {
        localStorage.setItem('sidemenu-selection-tree', JSON.stringify(linkTree));
    }
    
    public saveSidemenuLinkIdInLocalStorage(sidebarMenuLinkId: string) {
        //costruisco albero di apertura link menu e lo salvo nel local storage
        this.getAndSaveLinkTree(sidebarMenuLinkId);
        localStorage.setItem('sidemenu-selection', sidebarMenuLinkId);
        return true;
    }

    private getAndSaveLinkTree(sidebarMenuLinkId: string) {
        this.httpClient.get<any>("assets/config/sidebar-menu/items-it.json").subscribe(
            (json: LeftMenuLink[]) => {

                var count = Object.keys(json).length;
                var rootLeftMenuLink = <LeftMenuLink>{};
                rootLeftMenuLink.id = "root";
                rootLeftMenuLink.isNavigable = false;

                let children: LeftMenuLink[] = [];
                for (let i = 0; i<count; i++) {
                    children[i] = json[i];
                }
                rootLeftMenuLink.children = children;
                
                let res = this.find(rootLeftMenuLink, sidebarMenuLinkId);
                // remove child from path
                res.shift();
                // reverse of path
                this.tree = res.reverse();
                // remove root link
                this.tree.shift();
                this.saveSidemenuLinkTreeInLocalStorage(this.tree);
                this.tree = [];
            }
        )
    }

    private find(obj: LeftMenuLink, id: string){
        if(obj.id == id){
            return [id];
        }
        let result = [];
        if (obj.isNavigable == false) {
            for(var element of obj.children){
                result = result.concat(this.find(element, id));
            }
        }
        if(result.length > 0){
            result.push(obj.id);
        }
        return result;
    }
    

}
