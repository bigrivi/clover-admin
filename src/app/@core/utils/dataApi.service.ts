import { Injectable } from '@angular/core';
import { Http, Request,URLSearchParams, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {API_ROOT} from "../../config"
import {PubSubService} from "./pubsub.service"
import {AuthService} from '../../modules/auth/services/auth.service'
import {NbAuthSimpleToken,NbTokenService} from '../../modules/auth/services/token.service'
import {ResourceService} from "./resource.service"
import {TranslateService} from './translate.service'


@Injectable()
export class DataApiService{
    resource:ResourceService;
    config = {}
	constructor(resource: string,config,public http:Http,public pubsub:PubSubService,public authService:AuthService,public tokenService:NbTokenService) {
        this.resource = new ResourceService(resource,http,pubsub,authService,tokenService);
        this.config = config;
	}

}