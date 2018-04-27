import { Injectable } from '@angular/core';

export class ParameterService {
	config = {}
    constructor() {
		this.config = {
			resource:"parameter",
		}
	}

}
