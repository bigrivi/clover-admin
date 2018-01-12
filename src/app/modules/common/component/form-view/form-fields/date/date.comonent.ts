import { Component,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-input',
  template: `
  <ng-container [formGroup]="group" *ngIf="config.widget=='date'">
       <nz-datepicker [formControlName]="config.field" [nzFormat]="'YYYY-MM-DD'" [(ngModel)]="config.value" [nzPlaceHolder]="config.placeholder"></nz-datepicker>
  </ng-container>
  <ng-container [formGroup]="group" *ngIf="config.widget=='datetime'">
     <nz-datepicker nzShowTime [formControlName]="config.field" [nzFormat]="'YYYY-MM-DD HH:mm'" [(ngModel)]="config.value" [nzPlaceHolder]="config.placeholder"></nz-datepicker>
  </ng-container>
  <ng-container [formGroup]="group" *ngIf="config.widget=='time'">
      <nz-timepicker [formControlName]="config.field" [(ngModel)]="config.value" [nzPlaceHolder]="config.placeholder"></nz-timepicker>
  </ng-container>
  `
})
export class DateFieldComponent {
     _config;
     @Input() config;
     @Input() group;

     datePickerConfig1 = {
      locale: 'zh-CN',
      appendTo:"body",
      format:'YYYY-MM-DD'
    }

     datePickerConfig2 = {
      locale: 'zh-CN',
      appendTo:"body",
      format:'YYYY-MM-DD HH:mm'
    }

     datePickerConfig3 = {
       appendTo:"body",
      locale: 'zh-CN'
    }


     onFocus(){
       console.log("onFocus")
     }
}
