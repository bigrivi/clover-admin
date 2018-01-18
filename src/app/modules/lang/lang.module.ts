import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import {DpDatePickerModule} from 'ng2-date-picker';
import { HomeComponent } from './home.component'




const routes: Routes = [
{
  path: '',
  component: HomeComponent,
  children: [],
}
];


@NgModule({
  imports: [
    HttpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent

  ],
  entryComponents: [


  ],
  providers: [

  ],
  exports: [

  ],
})
export class LangModule {
  constructor(
  ) {

  }
}
