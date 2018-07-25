import { Component,Input,forwardRef,ContentChild } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidatorFn, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import * as _ from 'lodash';


const FORM_CARD_INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CardInputComponent),
  multi: true
};


@Component({
  selector: 'form-card-input',
  providers: [FORM_CARD_INPUT_VALUE_ACCESSOR],
  template: `
   <ng-container>
   <nz-input [nzType]="type"  [nzSize]="'large'" (ngModelChange)="_onChange($event)" [nzPlaceHolder]="placeholder" [(ngModel)]="_value">
  </nz-input>
  <span *ngIf="_value">卡号已加密</span>
   <a *ngIf="_value" nz-tooltip="{{_value}}">查看</a>
  </ng-container>

  `
})
export class CardInputComponent implements ControlValueAccessor {

    private onTouched: any = () => { }
    private valueChange: any = (value: any) => { }


     _value = "";
     _virtualValue = "";
     _rawValues:string[] = [];
     msg = ""


     @Input() placeholder = ""

     @Input() type = "password"

     @Input() multiple = false

     @ContentChild("input") inputElement:HTMLInputElement;



     writeValue(value: string) {
         this._value = value
         this.valueChange(value)

     }

     onValueChange(newValue){
       this.valueChange(newValue)

     }

     _onChange(newValue){
       this.valueChange(newValue)

     }





    registerOnChange(fn: any) {
      this.valueChange = fn;
    }

    registerOnTouched(fn: any) {
      this.onTouched = fn
    }
}
