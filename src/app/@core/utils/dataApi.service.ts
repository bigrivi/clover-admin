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
            this.datas[item.name] = {
                config:item.config,
                resource:new ResourceService(item.resource,http,pubsub,authService,tokenService)
            }
        })
	}

    get(name){
        return this.datas[name]
    }

}