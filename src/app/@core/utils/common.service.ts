import { Injectable,Injector } from '@angular/core';
import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';


@Injectable()
export class CommonService {
    constructor( 
		public injector:Injector,
        public messageService: NzMessageService
	) {
       
    }
}
