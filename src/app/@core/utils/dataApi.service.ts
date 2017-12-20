import { Injectable } from '@angular/core';
import { Http, Request,URLSearchParams, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {API_ROOT} from "../../config"
import {PubSubService} from "./pubsub.service"
import {NbAuthService} from '../../modules/auth/services/auth.service'
import {NbAuthSimpleToken,NbTokenService} from '../../modules/auth/services/token.service'
import {ResourceService} from "./resource.service"


export interface  IResourceService{
    
}


@Injectable()
class R extends ResourceService implements IResourceService{
    token:NbAuthSimpleToken;
    _resourceApi = ""
    constructor(resource: string,public http:Http,public pubsub:PubSubService,public authService:NbAuthService,public tokenService:NbTokenService) {
        super(http,pubsub,authService,tokenService)
        this._resourceApi = resource;
    }


   

    /**
     * Get请求
     *
     * @param {string} url
     * @param {any} body
     * @param {RequestOptionsArgs} [options]
     * @returns {Observable < Response >}
     * @memberof KnxHttp
     */
    get(body?, options ? : RequestOptionsArgs): Observable < Response > {
       return super.get(this._resourceApi,body,options)
    }



    /**
     * Post请求
     *
     * @param {string} url
     * @param {any} body
     * @param {RequestOptionsArgs} [options]
     * @returns {Observable < Response >}
     * @memberof KnxHttp
     */
    post(body, options ? : RequestOptionsArgs): Observable < Response > {
        return super.post(this._resourceApi,body,options)
    }


    /**
     * Put请求
     *
     * @param {string} url
     * @param {any} body
     * @param {RequestOptionsArgs} [options]
     * @returns {Observable < Response >}
     * @memberof KnxHttp
     */
    put(body, options ? : RequestOptionsArgs): Observable < Response > {
        return super.put(this._resourceApi,body,options)

    }

    /**
     * Delete请求
     *
     * @param {string} url
     * @param {RequestOptionsArgs} [options]
     * @returns {Observable < Response >}
     * @memberof KnxHttp
     */
    delete(options ? : RequestOptionsArgs): Observable < Response > {
       return super.delete(this._resourceApi,options)
    }

    
}


@Injectable()
export class DataApiService{
    resource:R;
    config = {}
	constructor(resource: string,config,public http:Http,public pubsub:PubSubService,public authService:NbAuthService,public tokenService:NbTokenService) {
        this.resource = new R(resource,http,pubsub,authService,tokenService);
        this.config = config;
	}
	
}