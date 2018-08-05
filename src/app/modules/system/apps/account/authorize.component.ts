import { Component, ViewChild, Inject,Input } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { pascalCaseSpace } from '../../../common/utils/common.utils'
import { UserService } from '../../../../@core/data/users.service'
import { TranslateService } from '../../../../@core/utils/translate.service'
import { FormViewComponent } from '../../../form/form-view.component'
import * as _ from 'lodash';
import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';
import { NzModalSubject } from 'ng-zorro-antd';


@Component({
    selector: 'account-pages',
    template: `
  <div class="modal-body">
       <fieldset *ngFor="let app of node_apps;let i=index">
              <legend (click)="toggleExpand(i)">
              <i class='fa fa-chevron-down' *ngIf="app.expand"></i>
              <i class='fa fa-chevron-right' *ngIf="!app.expand"></i>
              {{app.label}}
              </legend>
              <div class='control-groups' *ngIf="app.expand">
                <div class='control-group'>
                   <label class='control-label' nz-checkbox [(ngModel)]="app.checkedAll" (ngModelChange)="fanxuan(i)"><span>&nbsp;授权节点</span></label>
                   <div class='controls'>
                      <label nz-checkbox *ngFor="let fieldItem of app.items" [(ngModel)]="nodes_model[fieldItem.node]">
                        <span>{{fieldItem.label}}</span>
                      </label>
                    </div>
                </div>
              </div>
          </fieldset>
 </div>
 <div class="customize-footer">
 <button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="save()">
   保存
 </button>
 <button nz-button [nzType]="'default'" [nzSize]="'large'" (click)="handleCancel($event)">
   关闭
 </button>
</div>
  `,
})
export class AuthorizeComponent {
    node_id_by_app = {};
    params = {}
    nodes_model = {}
    node_apps = []
    @ViewChild(FormViewComponent) formView: FormViewComponent;
    @Input() auth_node_id = "";

    constructor(
        private subject: NzModalSubject,
        public route: ActivatedRoute,
        public messageService: NzMessageService,
        public translateService: TranslateService,
        @Inject("DataApiService") private dataApiService,
        public userService: UserService) {
        let resource = this.dataApiService.get("account.authNodeDataApi").resource
        resource.get().map(res => res.json().data).subscribe((res) => {
            let apps_temp = {}
            res.forEach((authNodeItem) => {
                this.node_id_by_app[authNodeItem.node] = authNodeItem._id;
                apps_temp[authNodeItem.app] = apps_temp[authNodeItem.app] || { items: [] };
                apps_temp[authNodeItem.app].label = this.translateService.instant(authNodeItem.app + ".APP_NAME")
                apps_temp[authNodeItem.app].expand = true
                apps_temp[authNodeItem.app].checkedAll = false;
                apps_temp[authNodeItem.app].app = authNodeItem.app
                var node_info = authNodeItem.node.split('.');
                var method_label = this.translateService.instant(authNodeItem.app + ".METHODS." + node_info[node_info.length - 1])
                var node_label = ""
                for (var i = 1; i < node_info.length - 1; i++) {
                    node_label += this.translateService.instant(authNodeItem.app + "." + pascalCaseSpace(node_info[i]))
                }
                apps_temp[authNodeItem.app].items.push({
                    node: authNodeItem.node,
                    app: authNodeItem.app,
                    label: method_label + " " + node_label
                })
            })
            this.node_apps = []
            let node_apps = []
            _.each(apps_temp, (item) => {
                node_apps.push(item)
            })
            this.node_apps = node_apps
        })

      

    }

    ngOnInit(){
        console.log(this.auth_node_id)
        if(this.auth_node_id!=""){
            this.dataApiService.get("account.authorizeDataApi").resource.get({ populate: "auth_node_id", auth_role_id: this.auth_node_id }).map(res => res.json().data).subscribe((res) => {
                res.forEach((item) => {
                    this.nodes_model[item.auth_node_id.node] = true
                })
            })
        }
    }

    save() {
        let selected_nodes = []
        this.node_apps.forEach((app) => {
            app.items.forEach((item) => {
                if (this.nodes_model[item.node])
                    selected_nodes.push(this.node_id_by_app[item.node])
            })
        })
        let resource = this.dataApiService.get("account.authorizeDataApi").resource
        let postData = { nodes: selected_nodes }
        console.log(postData)
        resource.put(this.auth_node_id, postData).map(res => res.json()).subscribe((res) => {
            this.messageService.success('授权成功');
            this.subject.next(res);
        })

    }


    toggleExpand(index) {
        this.node_apps[index].expand = !this.node_apps[index].expand
    }


    fanxuan(index) {
        this.node_apps[index].items.forEach((item) => {
            this.nodes_model[item.node] = !this.nodes_model[item.node];
        })
    }


    handleCancel(e) {
        this.subject.destroy('onCancel');
    }



}
