import { Component,Input,forwardRef } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidatorFn, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import * as _ from 'lodash';


const FORM_SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};


@Component({
  selector: 'form-select',
  providers: [FORM_SELECT_VALUE_ACCESSOR],
  template: `
  <ng-container *ngIf="multiple">
  <nz-select [nzMode]="'multiple'" [(ngModel)]="_value" (ngModelChange)="onValueChange($event)" [nzPlaceHolder]="placeholder" nzAllowClear>
      <nz-option
        *ngFor="let option of dataSource"
        [nzLabel]="option.label"
        [nzValue]="option.value"
        [nzDisabled]="option.disabled">
      </nz-option>
    </nz-select>
  </ng-container>
   <ng-container *ngIf="!multiple">
   <nz-select  [(ngModel)]="_value" (ngModelChange)="onValueChange($event)" [nzPlaceHolder]="placeholder" nzAllowClear>
      <nz-option
        *ngFor="let option of dataSource"
        [nzLabel]="option.label"
        [nzValue]="option.value"
        [nzDisabled]="option.disabled">
      </nz-option>
    </nz-select>
  </ng-container>

  `
})
export class SelectComponent implements ControlValueAccessor {

    private onTouched: any = () => { }
    private valueChange: any = (value: any) => { }


     _checklist = []
     _value = "";

     @Input() group;

     @Input() placeholder = ""

     @Input() multiple = false

     @Input() dataSource =[];


     writeValue(value: any) {
       if(_.isArray(value)){
        value = _.map(value,(item)=>{
            if(_.isObject(item)){
              return item["_id"]
            }
            return item
        })
       }
       else if(_.isObject(value)){
         value = value["_id"]
       }
       this._value = value;
       if(value)
         this.valueChange(value)
     }

     onValueChange(newValue){
       this.valueChange(newValue)

     }

    registerOnChange(fn: any) {
      this.valueChange = fn;
    }

    registerOnTouched(fn: any) {
      this.onTouched = fn
    }
}
