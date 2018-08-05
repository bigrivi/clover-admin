import { Injectable, Injector } from '@angular/core';
import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';
// import { DialogService} from '../../modules/common/component/dialog/dialog.service';


@Injectable()
export class CommonService {
    constructor(
        public injector: Injector,
        public messageService: NzMessageService
    ) {

    }
}
