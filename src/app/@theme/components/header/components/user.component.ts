import { Component } from '@angular/core';
import { SettingsService } from '../../../../@core/services/settings.service';
import { UserService } from '../../../../@core/data/users.service';
import {environment} from "../../../../../environments/environment"

@Component({
    selector: 'header-user',
    template: `
    <nz-dropdown nzPlacement="bottomRight">
        <div class="item d-flex align-items-center px-sm" nz-dropdown>
            <nz-avatar [nzSrc]="user?.picture" nzSize="small" class="mr-sm"></nz-avatar>
            {{user?.realname}}
        </div>
        <div nz-menu class="width-sm">
            <div nz-menu-item [nzDisable]="true"><i class="anticon anticon-user mr-sm"></i>个人中心</div>
            <div nz-menu-item [routerLink]="['/apps/account/profile']"><i class="anticon anticon-setting mr-sm"></i>设置</div>
            <li nz-menu-divider></li>
            <div nz-menu-item [routerLink]="['/auth/logout']"><i class="anticon anticon-setting mr-sm"></i>退出登录</div>
        </div>
    </nz-dropdown>
    `
})
export class HeaderUserComponent {
      user: any;
    constructor(public settings: SettingsService,private userService: UserService) {

        this.userService.userInfoChange().subscribe((userInfo)=>{
            this.user = userInfo
            if(this.user && this.user.avatar){
               this.user.picture = environment.API_ROOT+"uploader/attachments/preview?id="+this.user.avatar;
            }
          })
    }

}
