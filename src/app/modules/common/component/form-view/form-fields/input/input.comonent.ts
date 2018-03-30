import { Component,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-input',
  template: `
  <ng-container *ngIf="config.widget=='textarea'" [formGroup]="group">
        <nz-input [formControlName]="config.field"  [(ngModel)]="config.value" nzType="textarea" [nzAutosize]="autosize" nzPlaceHolder="{{config.placeholder}}"></nz-input>
  </ng-container>
   <ng-container *ngIf="config.widget!='textarea'" [formGroup]="group">
   <nz-input [nzType]="config.type" [nzSize]="'large'" [formControlName]="config.field" [nzId]="config.field" [nzPlaceHolder]="config.placeholder" [(ngModel)]="config.value">
  </nz-input>
  </ng-container>
  `
})
export class InputFieldComponent {
     @Input() config;
     @Input() group;
}