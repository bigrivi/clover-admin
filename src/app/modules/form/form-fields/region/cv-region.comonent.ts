import { Component,Input,forwardRef } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidatorFn, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import * as _ from 'lodash';
import {HttpService} from "../../../../@core/utils/resource.service"

const FORM_REGION_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RegionComponent),
  multi: true
};


@Component({
  selector: 'form-region',
  providers: [FORM_REGION_VALUE_ACCESSOR],
  template: `
    <nz-cascader [nzPlaceHolder]="_config.placeholder"
      (ngModelChange)="_onChange($event)"
      [(ngModel)]="_value"
      (nzLoad)="loadData($event)">
    </nz-cascader>

  `
})
export class RegionComponent implements ControlValueAccessor {
    constructor(public httpService:HttpService){

    }
    private onTouched: any = () => { }
    private valueChange: any = (value: any) => { }


     _config;
     _value: any[] = null;

     @Input()
     public set config(val){
       val.placeholder=val.placeholder || "请选择";
       this._config = _.cloneDeep(val);


     }
     @Input() group;


     _onChange(value) {
         let newValue = value[value.length-1]
         console.log(newValue)
        this.valueChange(newValue)
    }

    loadData(e: {option: any, index: number, resolve: Function, reject: Function}): void {
        // console.log(e)
        let parentId = 0;
        if (e.index >=0) {
            parentId = e.option.value
        }
        this.laodCityData(parentId).map(res =>res.json().data).subscribe((res)=>{
               res = res.map((item)=>{
                   return {
                      value: item.region_id,
                      label: item.name,
                      isLeaf: item.type>=3
                   }
               })
               e.resolve(res);
          })
    }


     writeValue(value: any) {
       if(value){
         let regions = JSON.parse(value)
         regions = regions.map((item)=>{
             return {
                  value: item.region_id,
                  label: item.name
              }
         })
         this._value = regions
         if(this._value.length>0){
            this.valueChange(this._value[this._value.length-1].value)
         }
       }
     }

    registerOnChange(fn: any) {
      this.valueChange = fn;
    }

    registerOnTouched(fn: any) {
      this.onTouched = fn
    }

    laodCityData(parentId){
        return this.httpService.get("region/region",{parent_id:parentId})
    }
}
