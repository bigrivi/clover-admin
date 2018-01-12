import { Component,ViewChild,Injector} from '@angular/core';
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
import {AppService} from '../../../common/services/app.service'
import {pascalCaseSpace} from '../../../common/utils/common.utils'
import {UserService} from '../../../../@core/data/users.service'
import {TranslateService} from '../../../../@core/utils/translate.service'
import {FormViewComponent} from '../../../common/component/form-view/form-view.component'
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import * as _ from 'lodash';


@Component({
  selector: 'account-pages',
  template: `
        <nz-card [nzBordered]="false">
        <ng-template #title>
           角色授权
      </ng-template>
       <ng-template #body>
       <fieldset *ngFor="let app of node_apps;let i=index">
              <legend (click)="toggleExpand(i)">
              <i class='fa fa-chevron-down' *ngIf="app.expand"></i>
              <i class='fa fa-chevron-right' *ngIf="!app.expand"></i>
              {{app.label}}
              </legend>
              <div class='control-groups' *ngIf="app.expand">
                <div class='control-group'>
                  <label class='control-label' data-original-title='Click to reverse selection' rel='tooltip'>
                  <input [id]="app.app" [(ngModel)]="app.checkedAll" (ngModelChange)="fanxuan(i)" type='checkbox'>&nbsp;授权节点</label>
                   <div class='controls'>
                      <label class='checkbox' *ngFor="let fieldItem of app.items" [for]='fieldItem.node'>
                       <input [(ngModel)]="nodes_model[fieldItem.node]" [id]="fieldItem.node" name="schema[only][]" type="checkbox" [value]="fieldItem.field" />
                        {{fieldItem.label}}
                      </label>

                    </div>
                </div>
              </div>
          </fieldset>
           <button type="submit" (click)="save()" class="btn btn-danger">授权</button>
          <button type="button" (click)="back()" class="btn">取消</button>
      </ng-template>
</nz-card>

  `,
})
export class AuthorizeComponent {
  node_id_by_app = {};
  params = {}
  nodes_model = {}
  node_apps = []
  @ViewChild(FormViewComponent) formView:FormViewComponent;

  constructor(
    public route: ActivatedRoute,
    public injector:Injector,
    public translateService:TranslateService,
    public appService:AppService,
    public toasterService:ToasterService,
    public userService:UserService ) {
      let resource = this.injector.get("account.authNodeDataApi").resource
      resource.get().map(res=>res.json().result).subscribe((res)=>{
         let apps_temp = {}
         res.forEach((authNodeItem)=>{
           this.node_id_by_app[authNodeItem.node] = authNodeItem._id;
           apps_temp[authNodeItem.app] = apps_temp[authNodeItem.app] || {items:[]};
           apps_temp[authNodeItem.app].label = this.translateService.instant(authNodeItem.app+".APP_NAME")
           apps_temp[authNodeItem.app].expand = true
           apps_temp[authNodeItem.app].checkedAll = false;
           apps_temp[authNodeItem.app].app = authNodeItem.app
           var node_info = authNodeItem.node.split('.');
           var method_label = this.translateService.instant(authNodeItem.app+".METHODS."+node_info[2])
           apps_temp[authNodeItem.app].items.push({
             node:authNodeItem.node,
             app:authNodeItem.app,
             label:method_label+" "+this.translateService.instant(authNodeItem.app+"."+pascalCaseSpace(node_info[1]))
           })
         })
         this.node_apps = []
         let node_apps = []
         _.each(apps_temp,(item)=>{
           node_apps.push(item)
         })
         this.node_apps = node_apps
      })


      this.injector.get("account.authorizeDataApi").resource.get({populate:"auth_node_id",auth_role_id:this.route.snapshot.params["id"]}).map(res=>res.json().result).subscribe((res)=>{
        res.forEach((item)=>{
          this.nodes_model[item.auth_node_id.node] = true
        })
      })


  }

  save(){
        let selected_nodes = []
        this.node_apps.forEach((app)=>{
           app.items.forEach((item)=>{
             if(this.nodes_model[item.node])
                selected_nodes.push(this.node_id_by_app[item.node])
          })
        })
        let resource = this.injector.get("account.authorizeDataApi").resource
        let postData = {role_id:this.route.snapshot.params["id"],nodes:selected_nodes}
        resource.post(postData).map(res=>res.json()).subscribe((res)=>{
          this.toasterService.pop('success', '授权成功');
        })

  }


  toggleExpand(index){
    this.node_apps[index].expand = !this.node_apps[index].expand
  }


   fanxuan(index){
    this.node_apps[index].items.forEach((item)=>{
      this.nodes_model[item.node] = !this.nodes_model[item.node];
    })
  }


  back(){
    window.history.go(-1)
  }



}
