import { Component,Injector,Input,forwardRef } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidatorFn, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import * as _ from 'lodash';
import {DialogService} from '../../../common/component/dialog/dialog.service'


const FORM_ITEMSELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ItemSelectComponent),
  multi: true
};


@Component({
  selector: 'form-item-select',
  providers: [FORM_ITEMSELECT_VALUE_ACCESSOR],
  template: `
  <div class="ant-select-enabled ant-select">
  <div [ngClass]="_selectionClassMap">
   <div class="ant-select-selection__rendered">
       <div *ngIf="_selectedOptions.length<=0" class="ant-select-selection__placeholder">
            {{placeholder}}
        </div>
        <div class="ant-select-selection-selected-value" *ngIf="_selectedOptions.length>0 && !multiple">
           {{_selectedOptions[0].label}}
        </div>
        <ul *ngIf="multiple">
         <li
            *ngFor="let option of _selectedOptions"
            class="ant-select-selection__choice" style="-webkit-user-select: none;">
            <div class="ant-select-selection__choice__content">{{option.label}}</div><span class="ant-select-selection__choice__remove" (click)="unSelectMultipleOption(option,$event)"></span>
          </li>
        </ul>
    </div>
    </div>
    </div>
   <button nz-button type="button" [nzType]="'primary'" (click)="openPicker()">选择</button>

  `
})
export class ItemSelectComponent implements ControlValueAccessor {

    constructor(public injector: Injector,public dialogService:DialogService){

    }

    private onTouched: any = () => { }
    private valueChange: any = (value: any) => { }


     _selectedOptions = []
     _selectionClassMap;


     @Input() placeholder = ""

     @Input() multiple = false

     @Input() dataSource ="";

    openPicker(){
      let currentValues = this.getSelectValues()
      this.dialogService.modalTable(this.dataSource,currentValues).then((res)=>{
          if(res.length>0){
            if(this.multiple){
              res.forEach((item)=>{
                  if(currentValues.indexOf(item._id)<0){
                    var option = {label:item.name,value:item._id}
                    this._selectedOptions.push(option)
                  }
              })
            }
            else
              this._selectedOptions = [{label:res[0].name,value:res[0]._id}]
            this.updateValue()
          }
      })
    }

    ngOnInit(){
      this._selectionClassMap = {
      ["ant-select-selection"]               : true,
      [`ant-select-selection--single`]  : !this.multiple,
      [`ant-select-selection--multiple`]: this.multiple
    };
    }

     writeValue(value: any) {
       if(_.isArray(value)){
        this._selectedOptions = _.map(value,(item)=>{
            return {label:item.name,value:item._id}
        })
       }
       else if(_.isObject(value)){
          this._selectedOptions = [{label:value.name,value:value._id}]
       }
       if(this._selectedOptions.length>0){
         this.updateValue()
       }
     }

     onValueChange(newValue){
       this.valueChange(newValue)

     }

    registerOnChange(fn: any) {
      this.valueChange = fn;
    }

    unSelectMultipleOption(option){
        var found = this._selectedOptions.indexOf(option)
        if(found>=0){
          this._selectedOptions.splice(found,1)
        }
        this.updateValue()
    }

    updateValue(){
      let lastValue = this.getSelectValues()
      if(lastValue.length==0)
        this.valueChange("")
      else
        this.valueChange(lastValue)
    }


    getSelectValues(){
      if(this.multiple){
        return _.map(this._selectedOptions,(item)=>{
            return item.value
        })
      }
      else{
        if(this._selectedOptions.length>0){
          return this._selectedOptions[0].value
        }
        return []
      }

    }

    registerOnTouched(fn: any) {
      this.onTouched = fn
    }
}
