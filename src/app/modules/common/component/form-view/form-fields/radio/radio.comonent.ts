import { Component,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-input',
  template: `
  <div class="radio" [formGroup]="group">
    <div class="form-check" *ngFor="let item of config.dataSource">
        <label class="custom-control custom-radio">
          <input [formControlName]="config.field" [id]="item.label" [(ngModel)]="config.value" [value]="item.value" type="radio" class="custom-control-input">
          <span class="custom-control-indicator"></span>
          <span class="custom-control-description">{{item.label}}</span>
        </label>
      </div>
 
  </div>
  `
})
export class RadioButtonFieldComponent {
     @Input() config;
     @Input() group;
}
