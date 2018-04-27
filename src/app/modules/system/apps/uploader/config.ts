import { Injectable } from '@angular/core';


export class AttachmentService {
	config = {}
    constructor() {
		this.config = {
			resource:"attachment",
			addable:false,
			fields : {
			}

		}
	}

}
