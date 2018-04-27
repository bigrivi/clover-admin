import { Component, ViewChild, Inject, Injector } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { AppService } from '../../../common/services/app.service'
import { UserService } from '../../../../@core/data/users.service'
import { FormViewComponent } from '../../../common/component/form-view/form-view.component'
import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';


@Component({
    selector: 'account-home',
    templateUrl: './home.html',
    styleUrls: ['./home.less']
})
export class HomeComponent {
    config;
    params = {};
    importObj = {
        success: 100,
        fail: 5,
        running: 20,
        waiting: 10
    };
    userGroupList: any[] = [];
    userList: any[] = [];
    langList: any[] = [];

    constructor(
        public route: ActivatedRoute,
        public injector: Injector,
        @Inject("DataApiService") private dataApiService,
        public messageService: NzMessageService,
        public userService: UserService) {

    }

    ngOnInit() {
        this.loadData()
    }

    loadData() {
        let userInfoResource = this.dataApiService.get("account.userInfoDataApi").resource
        userInfoResource.get().map(res => res.json()).subscribe((res) => {
            this.userList = res.data
        })

        let userRoleResource = this.dataApiService.get("account.userRoleDataApi").resource
        userRoleResource.get().map(res => res.json()).subscribe((res) => {
            this.userGroupList = res.data
        })

    }



}
