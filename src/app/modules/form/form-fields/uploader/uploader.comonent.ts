import { Component,Input,forwardRef } from '@angular/core';
import { FormGroup,ControlValueAccessor,NG_VALUE_ACCESSOR,ValidatorFn,NG_VALIDATORS,AbstractControl,ValidationErrors } from '@angular/forms';


@Component({
  selector: 'form--field-uploader',
  template: `
   <ng-container [formGroup]="group">
  <file-uploader [isAtachment]="config.isAtachment" [formControlName]="config.field"  [(ngModel)]="config.value"></file-uploader>
  </ng-container>
  `
})
export class UploaderFieldComponent {
     @Input() config;
     @Input() group;

 }
