import { Component,Input,forwardRef,Injector } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidatorFn, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import * as _ from 'lodash';
import {DialogService} from '../../../dialog/dialog.service'


const FORM_SELECT3_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Select3Component),
  multi: true
};


@Component({
  selector: 'select3',
  providers: [FORM_SELECT3_VALUE_ACCESSOR],
  template: `
  <div class="holder" *ngIf="multiple">
   <nz-select
      nzAllowClear
      [nzPlaceHolder]="placeholder"
      [nzFilter]="false"
      nzKeepUnListOptions
      [nzMode]="'multiple'"
      [(ngModel)]="selectedOption"
      (ngModelChange)="onValueChange($event)"
      (nzSearchChange)="searchChange($event)"
      [nzNotFoundContent]="'无法找到'"
      nzShowSearch>
      <nz-option
        *ngFor="let option of searchOptions"
        [nzLabel]="option.label"
        [nzValue]="option.value">
      </nz-option>
    </nz-select>
    <i (click)="openPicker()" class="fa fa-ellipsis-h" aria-hidden="true"></i>
  </div>
  <div class="holder" *ngIf="!multiple">
   <nz-select
      nzAllowClear
      [nzPlaceHolder]="placeholder"
      [nzFilter]="false"
      [(ngModel)]="selectedOption"
      (ngModelChange)="onValueChange($event)"
      (nzSearchChange)="searchChange($event)"
      [nzNotFoundContent]="'无法找到'"
      nzShowSearch>
      <nz-option
        *ngFor="let option of searchOptions"
        [nzLabel]="option.label"
        [nzValue]="option.value">
      </nz-option>
    </nz-select>
    <i (click)="openPicker()" class="fa fa-ellipsis-h" aria-hidden="true"></i>
  </div>
  `,
   styleUrls  : ["./cv-select3.component.less"]
})
export class Select3Component implements ControlValueAccessor {

    constructor(public injector:Injector,public dialogService:DialogService){

    }
    private onTouched: any = () => { }
    private valueChange: any = (value: any) => { }

     selectedOption=[];
     searchOptions = [];
     _checklist = []
     _value = "";


     @Input() placeholder = ""

     @Input() multiple = false

     @Input() dataSource ="";

     openPicker(){
      let currentValues = this.selectedOption
      if(!_.isArray(currentValues))
        currentValues = [currentValues]
      this.dialogService.modalTable(this.dataSource,currentValues).then((res)=>{
          if(res.length>0){
            if(this.multiple){
              res.forEach((item)=>{
                  if(currentValues.indexOf(item._id)<0){
                    this.selectedOption.push(item._id)
                    this.searchOptions.push({label:item.name,value:item._id})
                  }
              })

            }
            else{
              this.selectedOption = res[0]._id
              this.searchOptions = [{label:res[0].name,value:res[0]._id}]
            }
            if(this.selectedOption.length>0)
              this.valueChange(this.selectedOption)

          }
      })
     }


     writeValue(value: any) {
       if(_.isArray(value)){
        this.selectedOption = _.map(value,(item)=>{
            return item._id
        })
        this.searchOptions = _.map(value,(item)=>{
            return {label:item.name,value:item._id}
        })
       }
       else if(_.isObject(value)){
          this.selectedOption = value._id
          this.searchOptions = [{label:value.name,value:value._id}]
       }
       console.log("writeValue",value,this.selectedOption)
       if(this.selectedOption.length>0)
         this.valueChange(this.selectedOption)
     }

     onValueChange(newValue){
       console.log(newValue)
       this.valueChange(newValue)

     }

     searchChange(searchText) {
       console.log(searchText)
       if(searchText==""){
         return
       }
          let params = {
            sort:"-_id",
            "name__regex":searchText
          }
          let moduleArr = this.dataSource.split(".")
          let apiName = `${moduleArr[0]}.${moduleArr[1]}DataApi`;
          let dataApi = this.injector.get(apiName)
          let resource = dataApi.resource
          let moduleConfig = dataApi.config
          resource.get(params).subscribe((data) => {
            let res = data.json()
            let results = res.result;
            this.searchOptions = _.map(results,(item)=>{
              return {
                label:item.name,value:item._id
              }
            })

          },(error)=>{

          })
      }

    registerOnChange(fn: any) {
      this.valueChange = fn;
    }

    registerOnTouched(fn: any) {
      this.onTouched = fn
    }

    getSelectValues(){
      if(this.multiple){
        return _.map(this.selectedOption,(item)=>{
            return item.value
        })
      }
      else{
        if(this.selectedOption.length>0){
          return this.selectedOption[0].value
        }
        return []
      }

    }
}
