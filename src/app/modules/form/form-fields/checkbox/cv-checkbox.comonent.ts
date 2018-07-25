import { Component,Input,forwardRef } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidatorFn, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import * as _ from 'lodash';


const FORM_CHECKBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true
};


@Component({
  selector: 'form-checkbox',
  providers: [FORM_CHECKBOX_VALUE_ACCESSOR],
  template: `
  <label nz-checkbox *ngFor="let item of _config.dataSource;let i=index" [(ngModel)]="_checklist[i]" (ngModelChange)="selected($event,i)">
      <span>{{item.label}}</span>
    </label>

  `
})
export class CheckboxComponent implements ControlValueAccessor {

    private onTouched: any = () => { }
    private valueChange: any = (value: any) => { }


     _config;
     _checklist = []
     @Input()
     public set config(val){
       this._config = _.cloneDeep(val);
       for(var i=0;i<this._config.dataSource.length;i++){
           this._checklist[i] = false;
       }

     }
     @Input() group;

     selected(event,index){
      this._checklist[index] = event;
      let values = _.filter(this._config.dataSource,(item,index)=>{
          return this._checklist[index]
      })
      values = _.map(values,(item)=>{return item.value})
      this.valueChange(values.join(","))
     }

     writeValue(value: any) {
        let values = value.split(",")
         _.each(this._config.dataSource,(item,index)=>{
            if(values.indexOf(item.value)>=0){
              this._checklist[index] = true;
            }
        })
     }

    registerOnChange(fn: any) {
      this.valueChange = fn;
    }

    registerOnTouched(fn: any) {
      this.onTouched = fn
    }
}
