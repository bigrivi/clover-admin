import { Injectable } from '@angular/core';
import { Http, Request,URLSearchParams, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {PubSubService} from "./pubsub.service"
import {AuthService} from '../../modules/auth/services/auth.service'
import {NbAuthSimpleToken,NbTokenService} from '../../modules/auth/services/token.service'
import {ResourceService} from "./resource.service"
import {TranslateService} from './translate.service'

export class DataApiService{
    datas = {}
	constructor(dataApiCfgs:any[],public http:Http,public pubsub:PubSubService,public authService:AuthService,public tokenService:NbTokenService) {
        dataApiCfgs.forEach((item)=>{
            let configInstance = new item.configServiceCls(authService)
            configInstance.config.app = item.app;
            configInstance.config.module = item.module
            this.datas[item.name] = {
                config:configInstance.config,
                resource:new ResourceService(item.app+"/"+configInstance.config.resource,http,pubsub,authService,tokenService)
            }
        })
	}

    get(name){
        return this.datas[name]
    }

}
