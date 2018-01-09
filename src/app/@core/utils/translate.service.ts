import { Injectable } from '@angular/core';
import { Http, Request,URLSearchParams, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {API_ROOT} from "../../config"
import {PubSubService} from "./pubsub.service"
import {NbAuthService} from '../../modules/auth/services/auth.service'
import {NbAuthSimpleToken,NbTokenService} from '../../modules/auth/services/token.service'
import {ResourceService} from "./resource.service"


@Injectable()
export class TranslateService{

	langs = {}
	constructor(public http:Http) {
       
	}

	loadLangs(){
		this.http.get(API_ROOT+"home/i18n").map(res=>res.json()).subscribe((res)=>{
			console.log(res)
			this.langs = res;
		})
	}


	instant(key,params?){
		var key_items = key.split('.');
		if(key_items.length==1){
			key_items.unshift("common")
		}
		var app = key_items.shift()
        var lang = this.langs[app];
        key = key_items.pop()
        var ret = lang[key]
        if(ret)
			return ret;
		return key;
	}



	
}