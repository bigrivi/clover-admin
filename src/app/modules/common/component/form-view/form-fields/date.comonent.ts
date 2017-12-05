import { Component,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-input',
  template: `
  <ng-container [formGroup]="group" *ngIf="config.widget=='date'">
  <input [formControlName]="config.field" [dpDayPicker]="datePickerConfig1" [mode]="'day'"  [(ngModel)]="config.value" class="form-control" id="config.field" [theme]="'dp-material'" placeholder="{{config.placeholder}}">
  </ng-container>
  <ng-container [formGroup]="group" *ngIf="config.widget=='datetime'">
  <input [formControlName]="config.field" [dpDayPicker]="datePickerConfig2" [mode]="'daytime'"  [(ngModel)]="config.value" class="form-control" id="config.field" [theme]="'dp-material'" placeholder="{{config.placeholder}}">
  </ng-container>
  <ng-container [formGroup]="group" *ngIf="config.widget=='time'">
  <input [formControlName]="config.field" [dpDayPicker]="datePickerConfig3" [mode]="'time'"  [(ngModel)]="config.value" class="form-control" id="config.field" [theme]="'dp-material'" placeholder="{{config.placeholder}}">
  </ng-container>
  `
})
export class DateFieldComponent {
     _config;
     @Input() config;
     @Input() group;

     datePickerConfig1 = {
      locale: 'zh-CN',
      format:'YYYY-MM-DD'
    }

     datePickerConfig2 = {
      locale: 'zh-CN',
      format:'YYYY-MM-DD HH:mm'
    }

     datePickerConfig3 = {
      locale: 'zh-CN'
    }


     onFocus(){
       console.log("onFocus")
     }
}
