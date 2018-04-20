import { Component,Input,Injector,Inject,ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import {AppService} from '../../../../services/app.service'
import {DialogService} from "../../../dialog/dialog.service"
import {SelectComponent} from "./cv-select.comonent"
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

    @ViewChild(SelectComponent) selectComp:SelectComponent;
     _config;
     _dataSource = []
     @Input()
     public set config(val){
       let valClone = Object.assign({},val)
       valClone.placeholder=val.placeholder || "请选择";
       this._config = valClone
     }
     @Input() group;

     loadDataSource(){
         let moduleArr = this._config.dataSource.split(".")
         let apiName = `${moduleArr[0]}.${moduleArr[1]}DataApi`;
         let dataApi = this.dataApiService.get(apiName)
         let moduleConfig = dataApi.config
         let resource = dataApi.resource
         let params = {}
         if(this._config.queryParams){
           params = Object.assign(params,this._config.queryParams)
         }
         var currSelectLabel = this._dataSource.find((item)=>{
             return item["value"] == this._config.value
         })
         params["sort"] = "ord"
         this._dataSource = []
         resource.get(params).map((res)=>res.json().data).subscribe((res)=>{
             this._dataSource = _.map(res,(item)=>{
                 if(item["is_default"]==1){
                     this._config.value =  item[moduleConfig.valueField||"_id"]
                 }
                 return {
                   label:item[moduleConfig.labelField||"name"],
                   value:item[moduleConfig.valueField||"_id"]
                 }

             })
             if(currSelectLabel){
                 var isFoundInOption = this._dataSource.find((item)=>{
                     return item["value"] == currSelectLabel.value
                 })
                 if(!isFoundInOption){
                   this._config.value = null;
                 }
                 else{
                     this._config.value = isFoundInOption["value"];
                 }
             }


         })
     }

     ngOnInit(){
         if(!_.isArray(this._config.dataSource)){
            this.loadDataSource()
         }
         else{
            this._dataSource = this._config.dataSource
         }
     }

      openParameterDialog(){
      //this._config.value = null
      var selectIndex = -1
      this._dataSource.forEach((item,index)=>{
          if(item["value"] == this._config.value)
            selectIndex = index
      })
       this.dialogService.openParameterDialog("product_category",{selectIndex:selectIndex}).then(()=>{
           this.loadDataSource()
       })
     }
}
