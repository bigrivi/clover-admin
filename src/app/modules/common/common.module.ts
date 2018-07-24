import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { NgZorroAntdExtraModule } from 'ng-zorro-antd-extra';
import { CountdownModule } from 'ngx-countdown';
import { AngularWebStorageModule } from 'angular-web-storage';

import { FormViewComponent } from './component/form-view/form-view.component';
import { ListViewComponent } from './component/list-view/list-view.component';
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
import {RegionFieldComponent} from './component/form-view/form-fields/region/region.comonent';
import {RegionComponent} from './component/form-view/form-fields/region/cv-region.comonent';

import { CardInputFieldComponent } from './component/form-view/form-fields/input/card.comonent';
import { CardInputComponent } from './component/form-view/form-fields/input/cv-card.comonent';



import { DynamicFieldDirective } from './directive/dynamic-field.directive';
import { InputDebounceDirective } from './directive/input-deboune';

import { toUploadFileThumbPipe } from './pipes/to_upload_file_thumb.pipe';
import { toUploadFileSizePipe } from './pipes/to_upload_file_size.pipe';

import {TableViewDailogComponent} from './component/dialog/list.component';
import {EditDialogComponent} from './component/dialog/edit.component';
import {ExportDialogComponent} from './component/dialog/export.component';
import {ParameterDialogComponent} from './component/dialog/parameter.component';
import {SerachDialogComponent} from './component/dialog/search.component';
import {DialogService} from './component/dialog/dialog.service';


import { TableViewComponent } from './component/table-view/table-view.component';
import { QuerySelectComponent } from './component/query-select/query-select.comonent';
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
    ReactiveFormsModule,
    AngularWebStorageModule,
    NgZorroAntdExtraModule.forRoot()
  ],
  declarations: [
    FormViewComponent,
    ListViewComponent,
    TableViewComponent,
    QuerySelectComponent,
    InputFieldComponent,
    CardInputComponent,
    CardInputFieldComponent,
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
    RegionComponent,
    RegionFieldComponent,
    SelectComponent,
    ItemSelectComponent,
    TableViewDailogComponent,
    EditDialogComponent,
    ExportDialogComponent,
    ParameterDialogComponent,
    SerachDialogComponent,
    toUploadFileThumbPipe,
    toUploadFileSizePipe,
    ...DIRECTIVES, ...PIPES,...shared_components
  ],
  entryComponents: [
    ListViewComponent,
    InputFieldComponent,
    InputFieldComponent,
    SelectFieldComponent,
    ItemSelectFieldComponent,
    Select3FieldComponent,
    Select3Component,
    CardInputFieldComponent,
    CardInputComponent,
    DateFieldComponent,
    RadioButtonFieldComponent,
    CheckboxFieldComponent,
    UploaderFieldComponent,
    FileUploaderComponent,
    CheckboxComponent,
    SelectComponent,
    RegionFieldComponent,
    RegionComponent,
    ItemSelectComponent,
    TableViewComponent,
    QuerySelectComponent,
    TableViewDailogComponent,
    EditDialogComponent,
    ExportDialogComponent,
    ParameterDialogComponent,
    SerachDialogComponent,
    ...shared_entry_components

  ],
  providers: [
    AppService,
    DialogService,
  ],
  exports: [
    FormViewComponent,
    ListViewComponent,
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
