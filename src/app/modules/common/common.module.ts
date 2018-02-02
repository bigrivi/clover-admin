import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { TreeModule } from 'angular-tree-component';
import { NgZorroAntdExtraModule } from 'ng-zorro-antd-extra';
import { CountdownModule } from 'ngx-countdown';
import { AngularWebStorageModule } from 'angular-web-storage';

import {ChosenModule} from './component/chosen/chosen.module';
import { FormViewComponent } from './component/form-view/form-view.component';
import { InputFieldComponent } from './component/form-view/form-fields/input/input.comonent';
import { SelectFieldComponent } from './component/form-view/form-fields/select/select.comonent';
import { ItemSelectFieldComponent } from './component/form-view/form-fields/select/item-select.comonent';
import { Select3FieldComponent } from './component/form-view/form-fields/select/select3.comonent';
import { DateFieldComponent } from './component/form-view/form-fields/date/date.comonent';
import { RadioButtonFieldComponent } from './component/form-view/form-fields/radio/radio.comonent';
import { CheckboxFieldComponent } from './component/form-view/form-fields/checkbox/checkbox.comonent';
import {UploaderFieldComponent} from './component/form-view/form-fields/uploader/uploader.comonent';
import {FileUploaderComponent} from './component/form-view/form-fields/uploader/cv-uploader.comonent';
import {CheckboxComponent} from './component/form-view/form-fields/checkbox/cv-checkbox.comonent';
import {SelectComponent} from './component/form-view/form-fields/select/cv-select.comonent';
import {ItemSelectComponent} from './component/form-view/form-fields/select/cv-itemselect.comonent';
import {Select3Component} from './component/form-view/form-fields/select/cv-select3.comonent';


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

import { shared_entry_components, shared_components } from './component/index';

import { ImageDirective } from './directive/image.directive';
import { FixedBtnsDirective } from './directive/fixed-btns.directive';
import { ErrorCollectComponent } from './directive/error-collect.directive';

import { MomentDatePipe } from './pipes/moment-date.pipe';
import { CNCurrencyPipe } from './pipes/cn-currency.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { YNPipe } from './pipes/yn.pipe';
import { ModalHelper } from './helper/modal.helper';

const DIRECTIVES = [ ImageDirective, FixedBtnsDirective, ErrorCollectComponent];
const PIPES = [MomentDatePipe, CNCurrencyPipe, KeysPipe, YNPipe];
const HELPERS = [ ModalHelper ];





@NgModule({
  imports: [
    HttpModule,
    ThemeModule,
    RouterModule,
    TreeModule,
    ReactiveFormsModule,
    ChosenModule,
    AngularWebStorageModule,
    NgZorroAntdExtraModule.forRoot()
  ],
  declarations: [
    FormViewComponent,
    TableViewComponent,
    InputFieldComponent,
    DateFieldComponent,
    SelectFieldComponent,
    ItemSelectFieldComponent,
    Select3FieldComponent,
    Select3Component,
    DynamicFieldDirective,
    InputDebounceDirective,
    RadioButtonFieldComponent,
    CheckboxFieldComponent,
    UploaderFieldComponent,
    FileUploaderComponent,
    CheckboxComponent,
    SelectComponent,
    ItemSelectComponent,
    ConfirmComponent,
    AlertComponent,
    TableViewDailogComponent,
    toUploadFileThumbPipe,
    ...DIRECTIVES, ...PIPES,...shared_components
  ],
  entryComponents: [
    InputFieldComponent,
    SelectFieldComponent,
    ItemSelectFieldComponent,
    Select3FieldComponent,
    Select3Component,
    DateFieldComponent,
    RadioButtonFieldComponent,
    CheckboxFieldComponent,
    UploaderFieldComponent,
    FileUploaderComponent,
    CheckboxComponent,
    SelectComponent,
    ItemSelectComponent,
    TableViewComponent,
    ConfirmComponent,
    AlertComponent,
    TableViewDailogComponent,
    ...shared_entry_components

  ],
  providers: [
    AppService,
    DialogService,
  ],
  exports: [
    FormViewComponent,
    TableViewComponent,
    RouterModule,
    NgZorroAntdExtraModule,
    AngularWebStorageModule,
    // 第三方
    CountdownModule,
    // 多语言
    // 业务级
    ...shared_components,
    ...DIRECTIVES,
    ...PIPES
  ],
})
export class CommonModule {
  constructor(
  ) {

  }
}
