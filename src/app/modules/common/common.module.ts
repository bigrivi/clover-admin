import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { NgZorroAntdExtraModule } from 'ng-zorro-antd-extra';
import { CountdownModule } from 'ngx-countdown';
import { AngularWebStorageModule } from 'angular-web-storage';
import { ThemeModule } from '../../@theme/theme.module';
import { DynamiFormModule } from '../form/form.module';
import { InputDebounceDirective } from './directive/input-deboune';

//dialog
import { TableViewDailogComponent } from './component/dialog/list.component';
import { EditDialogComponent } from './component/dialog/edit.component';
import { ExportDialogComponent } from './component/dialog/export.component';
import { ParameterDialogComponent } from './component/dialog/parameter.component';
import { SerachDialogComponent } from './component/dialog/search.component';
import { DialogService } from './component/dialog/dialog.service';

import { shared_entry_components, shared_components } from './component/index';
import { ImageDirective } from './directive/image.directive';
import { FixedBtnsDirective } from './directive/fixed-btns.directive';
import { ErrorCollectComponent } from './directive/error-collect.directive';

import { ModalHelper } from './helper/modal.helper';
const DIRECTIVES = [ImageDirective, FixedBtnsDirective, ErrorCollectComponent];
const PIPES = [];
const HELPERS = [ModalHelper];

const DIALOG_COMPONENTS = [TableViewDailogComponent,EditDialogComponent,ExportDialogComponent,ParameterDialogComponent,SerachDialogComponent];


@NgModule({
    imports: [
        HttpModule,
        ThemeModule,
        RouterModule,
        ReactiveFormsModule,
        DynamiFormModule,
        AngularWebStorageModule,
        NgZorroAntdExtraModule.forRoot()
    ],
    declarations: [
        InputDebounceDirective,
        ...DIALOG_COMPONENTS,
        ...DIRECTIVES, ...PIPES, ...shared_components
    ],
    entryComponents: [
       ...DIALOG_COMPONENTS,
        ...shared_entry_components

    ],
    providers: [
        DialogService,
    ],
    exports: [
        RouterModule,
        NgZorroAntdExtraModule,
        AngularWebStorageModule,
        DynamiFormModule,
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
