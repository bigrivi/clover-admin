import { Component,Input,Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import {AppService} from '../../../../services/app.service'

@Component({
  selector: 'form-select',
  template: `
  <ng-container *ngIf="_config.multiple" [formGroup]="group">
      <chosen-multiple [placeholder_text_single]="_config.placeholder" class="form-chosen-select" [groups]="[]" [(ngModel)]="_config.value" [formControlName]="_config.field" [options]="_config.dataSource"></chosen-multiple>
  </ng-container>
   <ng-container *ngIf="!_config.multiple" [formGroup]="group">
    <chosen-single [placeholder_text_single]="_config.placeholder" class="form-chosen-select" [(ngModel)]="_config.value" [formControlName]="_config.field"  [options]="_config.dataSource"></chosen-single>
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
         let moduleConfig = this.appService.getAppModuleConfig(moduleArr[0],moduleArr[1])
         let apiName = `${moduleArr[0]}.${moduleArr[1]}DataApi`;
         let resource = this.injector.get(apiName).resource 
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
