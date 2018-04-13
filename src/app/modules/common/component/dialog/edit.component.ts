import { Component,Input,ViewChild,Injector,Inject,OnInit } from '@angular/core';
import {AppService} from '../../../common/services/app.service'
import {TableViewComponent} from "../table-view/table-view.component"
import { NzModalSubject } from 'ng-zorro-antd';
import {Subscription} from 'rxjs'
import {NzNotificationService,NzMessageService} from 'ng-zorro-antd';
import {FormViewComponent} from '../../../common/component/form-view/form-view.component'
import { Router, NavigationEnd } from '@angular/router';


  @Component({
    selector: 'ngx-dialog-list',
    template: `
     <div class="modal-body">
        <form-view [config]="formConfig"></form-view>
      </div>
     <div class="customize-footer">
          <button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="save($event)">
            确定
          </button>
          <button nz-button [nzType]="'default'" [nzSize]="'large'" (click)="handleCancel($event)">
            取消
          </button>
        </div>

    `,
     styles  : [
        `
        :host ::ng-deep.modal-body {
           max-height:500px;
           overflow:auto;
        }
        :host ::ng-deep.customize-footer {
            border-top: 1px solid #e9e9e9;
            padding: 10px 18px 0 10px;
            text-align: right;
            border-radius: 0 0 0px 0px;
            margin: 15px -16px -5px -16px;
        }
      `
    ]
  })
  export class EditDialogComponent implements OnInit {
  module= "";
  app= "";
  formConfig;
  @ViewChild(FormViewComponent) formView:FormViewComponent;

  @Input() config = {};

  constructor(
    private subject:NzModalSubject,
    public appService:AppService,
    @Inject("DataApiService") private dataApiService,
    public messageService: NzMessageService,
    public router: Router) {
  }

  ngOnInit() {
      this.module = this.config["module"];
      this.app = this.config["app"];
      let apiName = `${this.app}.${this.module}DataApi`;
      this.formConfig = Object.assign(this.dataApiService.get(apiName).config,{id:this.config["params"]["id"]})
  }



  save(){
    let apiName = `${this.formConfig.app}.${this.formConfig.module}DataApi`;
    let resource = this.dataApiService.get(apiName).resource
    if(this.formView.validata()){
        console.log(this.formView.form.value)
        if(this.config["params"]["id"]){ //update
            let id = this.config["params"]["id"]
            resource.put(id,this.formView.form.value).subscribe((res)=>{
               this.messageService.success('修改成功');
               this.subject.next(res.json());
           })
        }
        else{
          let postData = Object.assign(this.formView.form.value,this.config["params"])
          console.log(postData)
          resource.post(postData).subscribe((res)=>{
              this.messageService.success('保存成功');
              this.subject.next(res.json());
           })
        }
    }

  }

    handleCancel(e) {
      this.subject.destroy('onCancel');
    }

   ngOnDestroy(){


  }

}