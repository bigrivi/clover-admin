import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import {DpDatePickerModule} from 'ng2-date-picker';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { TreeModule } from 'angular-tree-component';

import {ChosenModule} from './component/chosen/chosen.module';
import { FormViewComponent } from './component/form-view/form-view.component';
import { InputFieldComponent } from './component/form-view/form-fields/input.comonent';
import { SelectFieldComponent } from './component/form-view/form-fields/select.comonent';
import { DateFieldComponent } from './component/form-view/form-fields/date.comonent';
import { RadioButtonFieldComponent } from './component/form-view/form-fields/radio.comonent';
import { CheckboxFieldComponent } from './component/form-view/form-fields/checkbox.comonent';
import {UploaderFieldComponent} from './component/form-view/form-fields/uploader.comonent';
import {FileUploaderComponent} from './component/form-view/form-fields/cv-uploader.comonent';
import {CheckboxComponent} from './component/form-view/form-fields/cv-checkbox.comonent';

import { DynamicFieldDirective } from './directive/dynamic-field.directive';
import { InputDebounceDirective } from './directive/input-deboune';

import { toUploadFileThumbPipe } from './pipes/to_upload_file_thumb.pipe';

import {ConfirmComponent} from './component/dialog/confirm.component';
import {AlertComponent} from './component/dialog/alert.component';
import {TableViewDailogComponent} from './component/dialog/list.component';
import {DialogService} from './component/dialog/dialog.service';


import { TableViewComponent } from './component/table-view/table-view.component';
import { ThemeModule } from '../../@theme/theme.module';
import {AppService} from "./services/app.service"
import {AuthGuardService} from "./services/auth-guard.service"


@NgModule({
  imports: [
    HttpModule,
    ThemeModule,
    TreeModule,
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
    CheckboxFieldComponent,
    UploaderFieldComponent,
    FileUploaderComponent,
    CheckboxComponent,
    ConfirmComponent,
    AlertComponent,
    TableViewDailogComponent,
    toUploadFileThumbPipe
  ],
  entryComponents: [
    InputFieldComponent,
    SelectFieldComponent,
    DateFieldComponent,
    RadioButtonFieldComponent,
    CheckboxFieldComponent,
    UploaderFieldComponent,
    FileUploaderComponent,
    CheckboxComponent,
    TableViewComponent,
    ConfirmComponent,
    AlertComponent,
    TableViewDailogComponent

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
