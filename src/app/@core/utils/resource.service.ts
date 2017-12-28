import { Injectable } from '@angular/core';
import { Http, Request,URLSearchParams, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {API_ROOT} from "../../config"
import {PubSubService} from "./pubsub.service"
import {NbAuthService} from '../../modules/auth/services/auth.service'
import {NbAuthSimpleToken,NbTokenService} from '../../modules/auth/services/token.service'



@Injectable()
export class ResourceService{
    token:NbAuthSimpleToken;
	constructor(public http:Http,public pubsub:PubSubService,public authService:NbAuthService,public tokenService:NbTokenService) {
		tokenService.tokenChange().subscribe((token)=>{
            console.log("token change")
            console.log(token)
            this.token = token
        })
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
    get(resource: string, body?, options ? : RequestOptionsArgs): Observable < Response > {
        //'userId':130
        let url = API_ROOT+resource
        if(body){
            url = url+"?"+this.formEncode(body)
        }
        return this.intercept(url,this.http.get(url, this.getRequestOptionArgs(options,body)));
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
    post(resource: string, body, options ? : RequestOptionsArgs): Observable < Response > {
        let url = API_ROOT+resource
        return this.intercept(url,this.http.post(url, body, this.getRequestOptionArgs(options,body)));
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
    put(resource: string, body, options ? : RequestOptionsArgs): Observable < Response > {
        let url = API_ROOT+resource
        return this.intercept(url,this.http.put(url, body, this.getRequestOptionArgs(options,body)));
    }

    /**
     * Delete请求
     *
     * @param {string} url
     * @param {RequestOptionsArgs} [options]
     * @returns {Observable < Response >}
     * @memberof KnxHttp
     */
    delete(resource: string, options ? : RequestOptionsArgs): Observable < Response > {
        let url = API_ROOT+resource
        return this.intercept(url,this.http.delete(url, this.getRequestOptionArgs(options)));
    }



    /**
     * 统一处理HTTP Headers
     *
     * @param {RequestOptionsArgs} [options]
     * @param {any} [body]
     * @returns {RequestOptionsArgs}
     * @memberof KnxHttp
     */
    getRequestOptionArgs(options ? : RequestOptionsArgs,body?): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers({
                'Accept':'*/*',
                'Content-Type': 'application/json;charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
                'accesstoken': this.token.getValue()
            });
        }
        
        return options;
    }


    /**
     * 拦截器：集中处理HTTP请求
     *
     * @param {Observable < Response >} observable
     * @returns {Observable < Response >}
     * @memberof KnxHttp
     */
    intercept(url,observable: Observable < Response > ): Observable < Response > {
        // this._pubsub.beforeRequest.emit("beforeRequestEvent")
        return Observable.create((observer) => {
                observable.subscribe((res)=>{
                    //如果服务端返回的ErrorCode不为0时 集中处理
                    let resJson = res.json()
                    if(resJson&&(resJson.code<0 && resJson.err)) //处理错误发生情况
                    {
                         this.pubsub.errorToast.emit(resJson.err);
                         observer.error(resJson.err)
                    }
                    else
                        observer.next(res);
                }, (err) => {
                    this.pubsub.afterRequest.emit("afterRequestEvent");
                    this.handleError(err.status);
                    observer.error(err)
                }, () => {
                    this.pubsub.afterRequest.emit("afterRequestEvent");
                });
        })


    }


     /**
     * 错误信息处理
     *
     * @param {any} status
     * @memberof KnxHttp
     */
    handleError(status) {
        console.log(status+" error occured!");
        if (status === 0) {
            this.pubsub.errorToast.emit("请求响应错误，请检查网络");
        } else if (status === 404) {
            this.pubsub.errorToast.emit("请求链接不存在");
        } else if (status === 500) {
            this.pubsub.errorToast.emit("服务器出错，请稍后再试");
        }else if (status === 401) {
            this.pubsub.errorToast.emit("未认证错误发生")
        } else {
            this.pubsub.errorToast.emit("未知错误，请检查网络");
        }
    }



     /**
     * 表单数据处理
     *
     * @param {any} obj
     * @returns
     * @memberof KnxHttp
     */
    formEncode(obj) {
        var encodedString = '';
        for (var key in obj) {
            if (encodedString.length !== 0) {
                  encodedString += '&';
            }

            encodedString += key + '=' + encodeURI(obj[key]);
        }
        return encodedString
       // return encodedString.replace(/%20/g, '+');
    }

	
}



@Injectable()
export class RestfulService extends ResourceService{
    token:NbAuthSimpleToken;
    _resourceApi = ""
    constructor(resource: string,public http:Http,public pubsub:PubSubService,public authService:NbAuthService,public tokenService:NbTokenService) {
        super(http,pubsub,authService,tokenService)
        this._resourceApi = resource;
    }


    get resourceApi(){
        return this._resourceApi
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
    get(body?,extraPath?, options ? : RequestOptionsArgs): Observable < Response > {
       extraPath = extraPath || ""
       return super.get(this._resourceApi+extraPath,body,options)
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
    post(body,options ? : RequestOptionsArgs): Observable < Response > {
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
    put(id,body, options ? : RequestOptionsArgs): Observable < Response > {
        return super.put(this._resourceApi+"/"+id,body,options)

    }

    /**
     * Delete请求
     *
     * @param {string} url
     * @param {RequestOptionsArgs} [options]
     * @returns {Observable < Response >}
     * @memberof KnxHttp
     */
    delete(id,options ? : RequestOptionsArgs): Observable < Response > {
       return super.delete(this._resourceApi+"/"+id,options)
    }

    
}

