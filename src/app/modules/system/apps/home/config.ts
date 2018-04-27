import { Injectable } from '@angular/core';

export class NavService {
	config = {}
    constructor() {
		this.config = {
			app:"home",
			resource:"navs",
			module:"nav",
			addable:false,
			fields : {
			}
		}
	}

}
