import { Component,ViewChild,Injector} from '@angular/core';
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
import {AppService} from '../../../common/services/app.service'
import {UserService} from '../../../../@core/data/users.service'
import {FormViewComponent} from '../../../common/component/form-view/form-view.component'
import {NzNotificationService,NzMessageService} from 'ng-zorro-antd';


@Component({
  selector: 'account-pages',
  template: `
  <nz-card [nzBordered]="false">
      <ng-template #title>
           资料修改
      </ng-template>
      <ng-template #body>
             <form-view [params]="params" [config]="config"></form-view>
             <div nz-form-control nz-col [nzSpan]="14" [nzXs]="24" [nzOffset]="4">
              <button nz-button [nzType]="'primary'" (click)="save()">保存</button>
          </div>
      </ng-template>
</nz-card>
  `,
})
export class ProfileComponent {
  config;
  params = {};
  @ViewChild(FormViewComponent) formView:FormViewComponent;

  constructor(
    public route: ActivatedRoute,
    public injector:Injector,
    public appService:AppService,
    public messageService: NzMessageService,
    public userService:UserService ) {
      this.config = this.injector.get("account.userInfoDataApi").config
       this.userService.userInfoChange().subscribe((userInfo)=>{
         this.params = {id:userInfo._id};
      })

  }

  save(){
    if(this.formView.validata()){
       let resource = this.injector.get("account.userInfoDataApi").resource
       console.log(this.formView.form.value)
       resource.put(this.params["id"],this.formView.form.value).subscribe((res)=>{
          this.messageService.success('修改成功');
          this.fetchFromRemote()
       })
    }
  }

  fetchFromRemote(){
     let resource = this.injector.get("account.userInfoDataApi").resource
     resource.get(this.formView.form.value,"/"+this.params["id"]).subscribe((res)=>{
          this.userService.setUserInfo(res.json()).subscribe(()=>{})
     })
  }

}
