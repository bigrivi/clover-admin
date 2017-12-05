import { Injectable } from '@angular/core';
import {ProductConfig,CategoryConfig,TagConfig} from '../../system/apps/product/config'
import {UserInfoConfig} from '../../system/apps/account/config'


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
			userInfo:UserInfoConfig
		}
	}

	getAppConfig(app){
		return this.config[app]
	}

	getAppModuleConfig(app,module){
		return this.config[app][module]
	}

}