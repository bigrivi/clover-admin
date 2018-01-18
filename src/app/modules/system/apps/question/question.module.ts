import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import {DpDatePickerModule} from 'ng2-date-picker';
import { HomeComponent } from './home.component'
import { QuestionListComponent } from './questionlist.component'

import { ThemeModule } from '../../../../@theme/theme.module';
import {CommonModule} from "../../../common/common.module"
import {HomeWJUANService} from "./services/home.service"

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [],
  },
  {
    path: 'question',
    component: QuestionListComponent,
    children: [],
  }
];


@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    ThemeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent,
    QuestionListComponent

  ],
  entryComponents: [


  ],
  providers: [
  HomeWJUANService
  ],
  exports: [

  ],
})
export class QuestionModule {
  constructor(
  ) {

  }
}
