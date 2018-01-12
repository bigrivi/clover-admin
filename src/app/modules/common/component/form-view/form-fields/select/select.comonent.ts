import { Component,Input,Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import {AppService} from '../../../../services/app.service'

@Component({
  selector: 'form-select',
  template: `
  <ng-container *ngIf="_config.multiple" [formGroup]="group">
  <nz-select [nzMode]="'multiple'" [formControlName]="_config.field" [(ngModel)]="_config.value" [nzPlaceHolder]="_config.placeholder" nzAllowClear>
      <nz-option
        *ngFor="let option of _config.dataSource"
        [nzLabel]="option.label"
        [nzValue]="option.value"
        [nzDisabled]="option.disabled">
      </nz-option>
    </nz-select>
  </ng-container>
   <ng-container *ngIf="!_config.multiple" [formGroup]="group">
   <nz-select [formControlName]="_config.field" [(ngModel)]="_config.value" [nzPlaceHolder]="_config.placeholder" nzAllowClear>
      <nz-option
        *ngFor="let option of _config.dataSource"
        [nzLabel]="option.label"
        [nzValue]="option.value"
        [nzDisabled]="option.disabled">
      </nz-option>
    </nz-select>
  </ng-container>
  `
})
export class SelectFieldComponent {

    constructor(private appService:AppService,public injector: Injector,){

    }
     _config;
     @Input()
     public set config(val){
       let valClone = Object.assign({},val)
       valClone.placeholder=val.placeholder || "请选择";
       this._config = valClone
       if(!_.isArray(this._config.dataSource)){
         this._config.dataSource = []
         let moduleArr = val.dataSource.split(".")
         let apiName = `${moduleArr[0]}.${moduleArr[1]}DataApi`;
         let dataApi = this.injector.get(apiName)
         let moduleConfig = dataApi.config
         let resource = dataApi.resource
         resource.get().map((res)=>res.json().result).subscribe((res)=>{
             this._config.dataSource = _.map(res,(item)=>{
                 return {
                   label:item[moduleConfig.labelField||"name"],
                   value:item[moduleConfig.valueField||"_id"]
                 }

             })
         })
       }
     }
     @Input() group;
}
