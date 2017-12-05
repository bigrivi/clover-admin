import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import {DpDatePickerModule} from 'ng2-date-picker';
import {ToasterModule, ToasterService} from 'angular2-toaster';

import {ChosenModule} from './component/chosen/chosen.module';
import { FormViewComponent } from './component/form-view/form-view.component';
import { InputFieldComponent } from './component/form-view/form-fields/input.comonent';
import { SelectFieldComponent } from './component/form-view/form-fields/select.comonent';
import { DateFieldComponent } from './component/form-view/form-fields/date.comonent';
import { RadioButtonFieldComponent } from './component/form-view/form-fields/radio.comonent';
import {UploaderFieldComponent} from './component/form-view/form-fields/uploader.comonent';
import {FileUploaderComponent} from './component/form-view/form-fields/cv-uploader.comonent';

import { DynamicFieldDirective } from './directive/dynamic-field.directive';
import { InputDebounceDirective } from './directive/input-deboune';

import { toUploadFileThumbPipe } from './pipes/to_upload_file_thumb.pipe';

import {ConfirmComponent} from './component/dialog/confirm.component';
import {AlertComponent} from './component/dialog/alert.component';
import {DialogService} from './component/dialog/dialog.service';


import { TableViewComponent } from './component/table-view/table-view.component';
import { ThemeModule } from '../../@theme/theme.module';
import {AppService} from "./services/app.service"
import {AuthGuardService} from "./services/auth-guard.service"


@NgModule({
  imports: [
    HttpModule,
    ThemeModule,
    ReactiveFormsModule,
    ChosenModule,
    DpDatePickerModule,
  ],
  declarations: [
    FormViewComponent,
    TableViewComponent,
    InputFieldComponent,
    DateFieldComponent,
    SelectFieldComponent,
    DynamicFieldDirective,
    InputDebounceDirective,
    RadioButtonFieldComponent,
    UploaderFieldComponent,
    FileUploaderComponent,
    ConfirmComponent,
    AlertComponent,
    toUploadFileThumbPipe
  ],
  entryComponents: [
    InputFieldComponent,
    SelectFieldComponent,
    DateFieldComponent,
    RadioButtonFieldComponent,
    UploaderFieldComponent,
    FileUploaderComponent,
    TableViewComponent,
    ConfirmComponent,
    AlertComponent

  ],
  providers: [
    AppService,
    DialogService,
    AuthGuardService
  ],
  exports: [
    FormViewComponent,
    TableViewComponent
  ],
})
export class CommonModule {
  constructor(
  ) {

  }
}
