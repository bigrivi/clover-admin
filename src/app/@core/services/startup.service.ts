import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { Http, Request,URLSearchParams, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { TranslateService } from '../utils/translate.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(
        private settingService: SettingsService,
        private translateService:TranslateService,
        private injector: Injector) { }

    load(): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log(this.translateService)
            //this.aclService.setFull(true);
            this.translateService.loadLangs().subscribe(()=>{
                resolve();
            })
        });
    }
}
