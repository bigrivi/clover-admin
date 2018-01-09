import { Component,ViewChild,Injector} from '@angular/core';
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
import {AppService} from '../../../common/services/app.service'
import {UserService} from '../../../../@core/data/users.service'
import {FormViewComponent} from '../../../common/component/form-view/form-view.component'
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';


@Component({
  selector: 'account-pages',
  template: `
       <nb-card>
      <nb-card-header>
      	资料修改
      </nb-card-header>
      <nb-card-body>
       <form-view [params]="params" [config]="config"></form-view>
      </nb-card-body>
       <nb-card-footer>
          <button type="submit" (click)="save()" class="btn btn-danger">保存</button>
       </nb-card-footer>
</nb-card>

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
    public toasterService:ToasterService,
    public userService:UserService ) {
      this.config = this.injector.get("account.userInfoDataApi").config 
       this.userService.userInfoChange().subscribe((userInfo)=>{
         this.params = {id:userInfo._id};
      })
    	
  }

  save(){
    if(this.formView.validata()){
       let resource = this.injector.get("account.userInfoDataApi").resource 
       resource.put(this.params["id"],this.formView.form.value).subscribe((res)=>{
          this.toasterService.pop('success', '修改成功');
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
