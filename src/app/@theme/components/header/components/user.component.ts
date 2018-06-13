import { Component,Inject } from '@angular/core';
import { SettingsService } from '../../../../@core/services/settings.service';
import { UserService } from '../../../../@core/data/users.service';
import {environment} from "../../../../../environments/environment"
import { DialogService } from "../../../../modules/common/component/dialog/dialog.service"

@Component({
    selector: 'header-user',
    template: `
    <nz-dropdown nzPlacement="bottomRight">
        <div class="item d-flex align-items-center px-sm" nz-dropdown>
            <nz-avatar [nzSrc]="user?.picture" nzSize="small" class="mr-sm"></nz-avatar>
            {{user?.realname}}
        </div>
        <div nz-menu nzClickActive="false" class="width-sm">
            <div nz-menu-item  nzSelected="false" (click)="openSetting()"><i class="anticon anticon-setting mr-sm"></i>设置</div>
            <li nz-menu-divider></li>
            <div nz-menu-item [routerLink]="['/auth/logout']"><i class="anticon anticon-setting mr-sm"></i>退出登录</div>
        </div>
    </nz-dropdown>
    `
})
export class HeaderUserComponent {
      user: any;
    constructor(    @Inject("DataApiService") private dataApiService,    public settings: SettingsService,private userService: UserService,public dialogService:DialogService) {

        this.userService.userInfoChange().subscribe((userInfo)=>{
            this.user = userInfo
            if(this.user && this.user.avatar){
               this.user.picture = environment.API_ROOT+"uploader/attachment/preview?id="+this.user.avatar;
            }
          })
    }

    openSetting(){
        let apiName = `account.userInfoDataApi`;
        let config = this.dataApiService.get(apiName).config
        this.dialogService.openEditDialog(config, { id: this.user._id }).then(() => {
            this.fetchFromRemote()
        })
    }

    fetchFromRemote(){
        let resource = this.dataApiService.get("account.userInfoDataApi").resource
        resource.get({},"/"+this.user["_id"]).subscribe((res)=>{
             this.userService.setUserInfo(res.json().data).subscribe(()=>{})
        })
     }

}
