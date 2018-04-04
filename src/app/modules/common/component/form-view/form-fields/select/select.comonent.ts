import { Component,Input,Injector,Inject} from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import {AppService} from '../../../../services/app.service'

@Component({
  selector: 'form-select-field',
  template: `
    <ng-container  [formGroup]="group">
  <form-select [placeholder]="_config.placeholder" [multiple]="_config.multiple" [dataSource] = "_dataSource" [formControlName]="_config.field" [(ngModel)]="_config.value"></form-select>
  </ng-container>
  `
})
export class SelectFieldComponent {

    constructor(private appService:AppService,@Inject("DataApiService") private dataApiService){

    }
     _config;
     _dataSource = []
     @Input()
     public set config(val){
       let valClone = Object.assign({},val)
       valClone.placeholder=val.placeholder || "请选择";
       this._config = valClone

       if(!_.isArray(this._config.dataSource)){
         this._dataSource = []
         let moduleArr = val.dataSource.split(".")
         let apiName = `${moduleArr[0]}.${moduleArr[1]}DataApi`;
         let dataApi = this.dataApiService.get(apiName)
         let moduleConfig = dataApi.config
         let resource = dataApi.resource
         let params = {}
         if(this._config.queryParams){
           params = Object.assign(params,this._config.queryParams)
         }
         resource.get(params).map((res)=>res.json().data).subscribe((res)=>{
             this._dataSource = _.map(res,(item)=>{
                 return {
                   label:item[moduleConfig.labelField||"name"],
                   value:item[moduleConfig.valueField||"_id"]
                 }

             })
         })
       }
       else{
          this._dataSource = this._config.dataSource
       }
     }
     @Input() group;
}
