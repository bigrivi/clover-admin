import { Component,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-card-input-field',
  template: `
   <ng-container  [formGroup]="group">
    <form-card-input [formControlName]="config.field"  [(ngModel)]="config.value"  placeholder="{{config.placeholder}}"></form-card-input>
  </ng-container>
  `
})
export class CardInputFieldComponent {
     @Input() config;
     @Input() group;
}
