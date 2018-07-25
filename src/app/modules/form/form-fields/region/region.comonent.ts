import { Component,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'region',
  template: `
   <ng-container [formGroup]="group">
  <form-region [formControlName]="config.field" [config]="config"  [(ngModel)]="config.value"></form-region>
  </ng-container>
  `
})
export class RegionFieldComponent {
     @Input() config;
     @Input() group;


}
