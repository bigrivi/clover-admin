import { Injectable } from '@angular/core';
import { Http, Request,URLSearchParams, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {PubSubService} from "./pubsub.service"
import {ResourceService} from "./resource.service"
import {environment} from "../../../environments/environment"


@Injectable()
export class TranslateService{

    langs = [
	    {
	    	text:"中文",
	    	code:"zh-cn"
	    },
	    {
	    	text:"英文",
	    	code:"en-us"
	    }
    ]
	langsData = {}
	constructor(public http:Http) {

	}

	loadLangs():Observable<any>{
		let lang = this.getCurrLang()
		return Observable.create((observer)=>{
			this.http.get(environment.API_ROOT+"home/i18n?lang="+lang).map(res=>res.json()).subscribe((res)=>{
				this.langsData = res.data;
				observer.next()
			})
		})

	}


	useLang(lang:string){
		localStorage.setItem("appLang",lang)

	}


	getCurrLang(){
		return localStorage.getItem("appLang") || "zh-cn"
	}


	instant(key,params?){
		var key_items = key.split('.');
		if(key_items.length==1){
			key_items.unshift("common")
		}
		var app = key_items.shift()
        var lang = this.langsData[app];
        try{
        	for(var i=0;i<key_items.length;i++){
	        	key = key_items[i];
	        	if(lang[key])
	        		lang = lang[key]
	        	else{
	        		key_items.unshift("common")
	        		return this.instant(key_items.join("."))
	        	}
	        }
	        return lang
        }catch(e){
        	return key;
        }

	}




}