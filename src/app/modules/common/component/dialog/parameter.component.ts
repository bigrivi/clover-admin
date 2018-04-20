import { Component,Input,ViewChild,Injector,Inject,OnInit,ChangeDetectionStrategy } from '@angular/core';
import {AppService} from '../../../common/services/app.service'
import {TableViewComponent} from "../table-view/table-view.component"
import { NzModalSubject } from 'ng-zorro-antd';
import {Subscription} from 'rxjs'
import {NzNotificationService,NzMessageService} from 'ng-zorro-antd';
import {FormViewComponent} from '../../../common/component/form-view/form-view.component'
import { Router, NavigationEnd } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators
} from '@angular/forms';

  @Component({
    selector: 'ngx-dialog-parameter',
    styleUrls:["parameter.component.less"],
    template: `
     <div class="modal-body">
       <form nz-form [formGroup]="formGroup" (ngSubmit)="_submitForm()">
        <table  width="100%" border="0" align="center" cellpadding="0" cellspacing="0" class="TableList">
                <tr class="TableHeader">
                    <td width="6%" align="center" id="" title="" onclick="">默认</td>
                    <td align="center" id="" title="" onclick="">名称</td>
                    <td align="center" id="" title="" onclick="">排序号</td>
                    <td align="center" id="" title="" onclick="">删除</td>
                </tr>
                <tr class="TableHeader">
                    <td align="center" id="Td2" title="">
                    <label nz-radio [nzValue]="'1'">
                        </label>
                    </td>
                    <td width="26%" align="center" id="Td3" title="" onclick="">空值</td>
                    <td width="14%" align="center" id="Td4" title="" onclick=""></td>
                    <td width="10%" align="center" id="Td5" title="" onclick=""></td>
                </tr>

                <tr *ngFor="let control of formGroup.controls;let i = index" class="TableData">
                  <ng-container [formGroup]="control">
                    <td align="center" id="" title="" onclick="">
                    <nz-radio-group (ngModelChange)="onDefaultChange(i)" [formControlName]="'is_default'">
                        <label nz-radio [nzValue]="'1'">
                        </label>
                    </nz-radio-group>
                    </td>
                    <td width="26%" align="center" id="" title="">
                        <nz-input
                        style="width: 100%;"
                        [nzSize]="'large'"
                        [formControlName]="'name'"
                        [nzId]="index">
                      </nz-input>
                    </td>
                    <td width="14%" align="center" id="" title="">
                       <nz-input
                        style="width: 100%;"
                        [nzSize]="'large'"
                        [formControlName]="'ord'"
                        [nzId]="index">
                      </nz-input>
                    </td>
                    <td width="10%" align="center" id="" title="">
                    <i class="fa fa-remove remove" (click)="removeRow(i)"></i>
                    </td>
                  </ng-container>
                </tr>


            </table>
            </form>
      </div>
     <div class="customize-footer" nz-row>
         <div nz-col [nzSm]="12" style="text-align:left">
         <button nz-button [nzType]="'default'" [nzSize]="'large'" (click)="addRow()">
            添加
          </button>
         </div>
          <div nz-col [nzSm]="12">
           <button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="save()">
            保存
          </button>
          <button nz-button [nzType]="'default'" [nzSize]="'large'" (click)="handleCancel($event)">
            关闭
          </button>
         </div>

        </div>

    `
  })
  export class ParameterDialogComponent implements OnInit {
  formGroup: FormArray;
  resource:any;

  constructor(
    private subject:NzModalSubject,
    public appService:AppService,
    private fb: FormBuilder,
    @Inject("DataApiService") private dataApiService,
    public messageService: NzMessageService,
    public router: Router) {


   this.formGroup = this.fb.array([])
   this.resource = this.dataApiService.get("dataModel.parameterDataApi").resource

  }

  ngOnInit() {

     this.resource.get({"group__equals":"product_category"}).subscribe((res)=>{
          res = res.json().data
          res = res.map((item)=>{
            this.addRow({
              "is_default":item["is_default"].toString(),
              "name":item["name"],
              "ord":item["ord"]
            })
          })
          //this.formGroup.setValue(res)
      })

  }

  addRow(data) {
     data = data || {
        "is_default":"0",
        "name":"",
        "ord":"0"
      }
    const {is_default,name,ord} = data
    let formGroup:FormGroup = this.fb.group({
        'is_default': [is_default, [Validators.required]],
        'name': [name, [Validators.required]],
        'ord': [ord, [Validators.required]]
     })
    this.formGroup.push(formGroup)

  }

  onDefaultChange(index){
    for(var i=0;i<this.formGroup.controls.length;i++){
       let current = this.formGroup.controls[i].get("is_default");
       if(current.value=="1" && i!=index)
         current.setValue("0")
    }


  }

  removeRow(index){
    this.formGroup.removeAt(index)
  }

  save(){
    let parameters = this.formGroup.value
    parameters = parameters.filter((item)=>{
      return item.name!=""
    })

    parameters.forEach((item)=>{
      item.group = "product_category"
    })
    this.resource.post({parameters:parameters,group:"product_category"}).subscribe((res)=>{
        console.log(res)
    })

  }

  handleCancel(e) {
    this.subject.destroy('onCancel');
  }

  ngOnDestroy(){


  }

}