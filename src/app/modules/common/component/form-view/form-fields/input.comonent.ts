import { Component,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-input',
  template: `
  <ng-container *ngIf="config.widget=='textarea'" [formGroup]="group">
  <textarea class="form-control" [formControlName]="config.field"  [(ngModel)]="config.value" placeholder="{{config.placeholder}}"></textarea>
  </ng-container>
   <ng-container *ngIf="config.widget!='textarea'" [formGroup]="group">
  <input  [type]="config.widget" [formControlName]="config.field"  [(ngModel)]="config.value" class="form-control" id="config.field" placeholder="{{config.placeholder}}">
  </ng-container>
  `
})
export class InputFieldComponent {
     @Input() config;
     @Input() group;
}
