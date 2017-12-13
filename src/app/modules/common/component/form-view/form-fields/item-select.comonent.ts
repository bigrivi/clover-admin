import { Component,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import {ResourceService} from '../../../../../@core/utils/resource.service'
import {AppService} from '../../../services/app.service'

@Component({
  selector: 'form-select',
  template: `
  <ng-container [formGroup]="group">
      <chosen-item-select [config]="_config" [placeholder_text_single]="_config.placeholder" class="form-chosen-select" [(ngModel)]="_config.value" [formControlName]="_config.field"></chosen-item-select>
  </ng-container>
  `
})
export class ItemSelectFieldComponent {

    constructor(private resourceService:ResourceService,private appService:AppService){

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
