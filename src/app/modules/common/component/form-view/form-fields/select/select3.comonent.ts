import { Component,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import {AppService} from '../../../../services/app.service'

@Component({
  selector: 'form-select3-field',
  template: `
  <ng-container [formGroup]="group">
     <select3  [(ngModel)]="_config.value" [multiple]="_config.multiple" [dataSource]="_config.dataSource" [placeholder]="_config.placeholder" [formControlName]="_config.field"></select3>
  </ng-container>
  `
})
export class Select3FieldComponent {

    constructor(private appService:AppService){

    }
     _config;
     @Input()
     public set config(val){
       let valClone = Object.assign({},val)
       valClone.placeholder=val.placeholder || "请输入查询";
       this._config = valClone
     }
     @Input() group;
}
