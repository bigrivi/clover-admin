import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { ThemeType } from './themes.service';

const KEY = 'layout';
const USERKEY = 'user';
export interface User {
    empud?: string;
    name?: string;
    avatar?: string;
    email?: string;
    [key: string]: any;
}

export interface App {
    name?: string;
    description?: string;
    year?: number;
    [key: string]: any;
}

export type SidebarThemeType = 'light' | 'dark';

export interface Layout {
    /** 是否固定顶部菜单 */
    fixed: boolean;
    /** 是否折叠右边菜单 */
    collapsed: boolean;
    /** 是否固定宽度 */
    boxed: boolean;
    /** 当前主题 */
    theme: ThemeType;
    /** 语言环境 */
    lang: string;
    /** 当前选中模块 */
    model: string;
}

@Injectable()
export class SettingsService {
    app: App = {
        year: (new Date()).getFullYear()
    };

    pagesize = 15;

    private _user: User = null;

    private _layout: Layout = null;

    get layout(): Layout {
        if (!this._layout) {
            this._layout = Object.assign(<Layout>{
                fixed: true,
                collapsed: false,
                boxed: false,
                theme: 'A',
                lang: null,
                model: ''
            }, this.local.get(KEY));
            this.local.set(KEY, this._layout);
        }
        return this._layout;
    }
    get user(): User { 
        this._user = Object.assign(<User>{
            empud: "",
            name:  "",
            avatar: "",
            email:  ""
        }, this.local.get(USERKEY)); 

        return this._user;
    }

    setLayout(name: string, value: any): boolean {
        if (typeof this.layout[name] !== 'undefined') {
            this.layout[name] = value;
            this.local.set(KEY, this._layout);
            return true;
        }
        return false;
    }

    setApp(val: App) {
        this.app = Object.assign(this.app, val);
    }

    setUser(val: User) {
        this.local.set(USERKEY, val); 
    }
    
    constructor(private local: LocalStorageService) { }
}
