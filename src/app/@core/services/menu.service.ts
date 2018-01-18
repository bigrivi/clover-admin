import { ACLService } from './../acl/acl.service';
import { Injectable } from '@angular/core';
import { ACLType } from '../acl/acl.type';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { debug } from 'util';
import { SettingsService } from './settings.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

export interface Menu {
    /** 文本 */
    text: string;
    /** i18n主键 */
    translate?: string;
    /** 是否菜单组 */
    group?: boolean;
    /** angular 链接 */
    link?: string;
    /** 外部链接 */
    externalLink?: string;
    /** 链接 target */
    target?: '_blank' | '_self' | '_parent' | '_top';
    /** 图标 */
    icon?: string;
    /** 徽标数，展示的数字。（注：`group:true` 无效） */
    badge?: number;
    /** 徽标数，显示小红点 */
    badge_dot?: boolean;
    /** 徽标数，设置 Badge 颜色 （默认：error， 所有颜色值见：https://github.com/cipchk/ng-alain/blob/master/_documents/utils.md#色彩） */
    badge_status?: string;
    /** 是否隐藏 */
    hide?: boolean;
    /** ACL配置 */
    acl?: string | string[] | ACLType;
    /** 是否快捷菜单项 */
    shortcut?: boolean;
    /** 快捷菜单根节点 */
    shortcut_root?: boolean;
    /** 二级菜单 */
    children?: Menu[];
    /**
     * 菜单类型，无须指定由 Service 自动识别
     * 1：链接
     * 2：外部链接
     * 3：链接（子菜单）
     */
     _type?: number;
     /** 是否选中 */
     _selected?: boolean;
     /** 是否打开 */
     _open?: boolean;
     _depth?: number;

     [key: string]: any;
 }

 @Injectable()
 export class MenuService {

     private data: Menu[] = [];
     protected activeIndexState$ = new BehaviorSubject(-1);

     constructor(
         private aclService: ACLService,
         private httpClient: HttpClient,
         private settings: SettingsService,
         ) {

     }

     visit(callback: (item: Menu, parentMenum: Menu, depth?: number) => void) {
         const inFn = (list: Menu[], parentMenu: Menu, depth: number) => {
             for (const item of list) {
                 callback(item, parentMenu, depth);
                 if (item.children && item.children.length > 0) {
                     inFn(item.children, item, depth + 1);
                 } else {
                     item.children = [];
                 }
             }
         };

         inFn(this.data, null, 0);
     }



     setDefault(url: string) {
         if (!url) {
             return;
         }

         let findItem: Menu = null;
         this.visit(item => {
             item._open = false;
             if (!item.link) {
                 return;
             }
             if (!findItem && item.link.includes(url)) {
                 findItem = item;
             }
         });
         if (!findItem) {
             console.warn(`not found page name: ${url}`);
             return;
         }

         do {
             findItem._open = true;
             findItem = findItem.__parent;
         } while (findItem);
     }






    setData(data: any) {
         this.data = data;
        //默认选择第一个
        let lastNavIndex = parseInt(localStorage.getItem("lastNavIndex"))
        if(lastNavIndex>=0)
            this.setCurrNav(lastNavIndex)
    }

    getData() {
        return this.data
    }


    setCurrNav(index: number) {
        localStorage.setItem("lastNavIndex",index.toString())
        this.activeIndexState$.next(index);
    }

    onNavChangeState(): Observable<any> {
        return this.activeIndexState$.asObservable();
    }

}
