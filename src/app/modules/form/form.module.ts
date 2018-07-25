import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { CommonModule } from '../common/common.module';

import { FormViewComponent } from './form-view.component';

import { InputFieldComponent } from './form-fields/input/input.comonent';
import { SelectFieldComponent } from './form-fields/select/select.comonent';
import { ItemSelectFieldComponent } from './form-fields/select/item-select.comonent';
import { Select3FieldComponent } from './form-fields/select/select3.comonent';
import { DateFieldComponent } from './form-fields/date/date.comonent';
import { RadioButtonFieldComponent } from './form-fields/radio/radio.comonent';
import { CheckboxFieldComponent } from './form-fields/checkbox/checkbox.comonent';
import {UploaderFieldComponent} from './form-fields/uploader/uploader.comonent';
import {FileUploaderComponent} from './form-fields/uploader/cv-uploader.comonent';
import {CheckboxComponent} from './form-fields/checkbox/cv-checkbox.comonent';
import {SelectComponent} from './form-fields/select/cv-select.comonent';
import {ItemSelectComponent} from './form-fields/select/cv-itemselect.comonent';
import {Select3Component} from './form-fields/select/cv-select3.comonent';
import {RegionFieldComponent} from './form-fields/region/region.comonent';
import {RegionComponent} from './form-fields/region/cv-region.comonent';
import { CardInputFieldComponent } from './form-fields/input/card.comonent';
import { CardInputComponent } from './form-fields/input/cv-card.comonent';

import { DynamicFieldDirective } from './dynamic-field.directive';


const FIELDS_COMPONENTS = [
    InputFieldComponent,
    SelectFieldComponent,
    ItemSelectFieldComponent,
    Select3FieldComponent,
    DateFieldComponent,
    RadioButtonFieldComponent,
    CheckboxFieldComponent,
    UploaderFieldComponent,
    FileUploaderComponent,
    CheckboxComponent,
    SelectComponent,
    ItemSelectComponent,
    Select3Component,
    RegionFieldComponent,
    RegionComponent,
    CardInputFieldComponent,
    CardInputComponent
]



@NgModule({
  imports: [
    ThemeModule,
    ReactiveFormsModule
  ],
  declarations: [
    DynamicFieldDirective,
    FormViewComponent,
   ...FIELDS_COMPONENTS
  ],
  entryComponents: [
  ...FIELDS_COMPONENTS
  ],
  providers: [
    
  ],
  exports: [
    FormViewComponent,
    ...FIELDS_COMPONENTS
  ],
})
export class DynamiFormModule {
  constructor(
  ) {

  }
}
