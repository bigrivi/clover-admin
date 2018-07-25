import { Component,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'form-checkbox-field',
  template: `
   <ng-container [formGroup]="group">
  <form-checkbox [formControlName]="config.field" [config]="config"  [(ngModel)]="config.value"></form-checkbox>
  </ng-container>
  `
})
export class CheckboxFieldComponent {
     @Input() config;
     @Input() group;


}
