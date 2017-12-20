import { Injectable,InjectionToken,ReflectiveInjector } from '@angular/core';
import {ProductConfig,CategoryConfig,TagConfig} from '../../system/apps/product/config'
import {UserInfoConfig,DepartmentConfig} from '../../system/apps/account/config'


@Injectable()
export class AppService{
	config = {}
	constructor() {
		this.config["product"] = {
			product:ProductConfig,
			category:CategoryConfig,
			tag:TagConfig
		}

		this.config["account"] = {
			userInfo:UserInfoConfig,
			department:DepartmentConfig
		}

		// var t = new InjectionToken<string>("value");
		var injector = ReflectiveInjector.resolveAndCreate([
		  {provide: "UU", useValue: "bindingValue"}
		]);
		console.log(injector.get("UU")); // "bindingValue"

	}

	getAppConfig(app){
		return this.config[app]
	}

	getAppModuleConfig(app,module){
		return this.config[app][module]
	}

}