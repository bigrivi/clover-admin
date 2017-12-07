import { Injectable } from '@angular/core';
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
	}

	getAppConfig(app){
		return this.config[app]
	}

	getAppModuleConfig(app,module){
		return this.config[app][module]
	}

}