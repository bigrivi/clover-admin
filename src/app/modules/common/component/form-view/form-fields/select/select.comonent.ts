import { Component,Input,Injector,Inject} from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import {AppService} from '../../../../services/app.service'
import {DialogService} from "../../../dialog/dialog.service"

@Component({
  selector: 'form-select-field',
  template: `
    <ng-container  [formGroup]="group">
  <form-select [placeholder]="_config.placeholder" [multiple]="_config.multiple" [dataSource] = "_dataSource" [formControlName]="_config.field" [(ngModel)]="_config.value"></form-select>
   <a (click)="openParameterDialog()">
      &nbsp;<i class="fa fa-plus"></i><span>编辑</span>
    </a>
  </ng-container>
  `
  ,styles  : [
        `
        :host ::ng-deep nz-select {
            width:calc(100% - 100px)
        }

      `
    ]
})
export class SelectFieldComponent {

    constructor(private appService:AppService,@Inject("DataApiService") private dataApiService,public dialogService:DialogService){

    }
     _config;
     _dataSource = []
     @Input()
     public set config(val){
       let valClone = Object.assign({},val)
       valClone.placeholder=val.placeholder || "请选择";
       this._config = valClone

       if(!_.isArray(this._config.dataSource)){
          this.loadDataSource()
       }
       else{
          this._dataSource = this._config.dataSource
       }
     }
     @Input() group;

     loadDataSource(){
        this._dataSource = []
         let moduleArr = this._config.dataSource.split(".")
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
                 //console.log(this._config.value)
                 return {
                   label:item[moduleConfig.labelField||"name"],
                   value:item[moduleConfig.valueField||"_id"]
                 }

             })

             var isFoundInOption = this._dataSource.find((item)=>{
                 return item["_id"] == this._config.value
             })

             if(!isFoundInOption){
               this._config.value = "";
             }
         })
     }

      openParameterDialog(){
       this.dialogService.openParameterDialog("product_category").then(()=>{
           this.loadDataSource()
       })
     }
}
