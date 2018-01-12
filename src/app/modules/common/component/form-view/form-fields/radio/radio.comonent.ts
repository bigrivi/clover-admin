import { Component,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-input',
  template: `
  <div  [formGroup]="group">
  <nz-radio-group [formControlName]="config.field" [(ngModel)]="config.value">
      <label *ngFor="let item of config.dataSource" nz-radio [nzValue]="item.value">
        <span>{{item.label}}</span>
      </label>
    </nz-radio-group>
  </div>
  `
})
export class RadioButtonFieldComponent {
     @Input() config;
     @Input() group;
}
