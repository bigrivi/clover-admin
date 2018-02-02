import { Component,Input,Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import {AppService} from '../../../../services/app.service'
import {DialogService} from '../../../dialog/dialog.service'

@Component({
  selector: 'form-item-select-field',
  template: `
 <ng-container  [formGroup]="group">
  <form-item-select [placeholder]="_config.placeholder" [multiple]="_config.multiple" [dataSource] = "_config.dataSource" [formControlName]="_config.field" [(ngModel)]="_config.value"></form-item-select>
  </ng-container>
  `
})
export class ItemSelectFieldComponent {

    constructor(private appService:AppService,public injector: Injector,public dialogService:DialogService){

    }

     _config;
     @Input()
     public set config(val){
       let valClone = Object.assign({},val)
       valClone.placeholder=val.placeholder || "请选择";
       this._config = valClone

     }
     @Input() group;
}
