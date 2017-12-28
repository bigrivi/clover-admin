import { Injectable } from '@angular/core';
import { Http, Request,URLSearchParams, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {API_ROOT} from "../../config"
import {PubSubService} from "./pubsub.service"
import {NbAuthService} from '../../modules/auth/services/auth.service'
import {NbAuthSimpleToken,NbTokenService} from '../../modules/auth/services/token.service'
import {ResourceService,RestfulService} from "./resource.service"


@Injectable()
export class DataApiService{
    resource:RestfulService;
    config = {}
	constructor(resource: string,config,public http:Http,public pubsub:PubSubService,public authService:NbAuthService,public tokenService:NbTokenService) {
        this.resource = new RestfulService(resource,http,pubsub,authService,tokenService);
        this.config = config;
	}
	
}