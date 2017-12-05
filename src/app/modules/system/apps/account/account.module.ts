import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import {DpDatePickerModule} from 'ng2-date-picker';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { ProfileComponent } from './profile.component'
import { SystemModule } from '../../system.module'
import { ThemeModule } from '../../../../@theme/theme.module';
import {CommonModule} from "../../../common/common.module"


const routes: Routes = [
{
  path: 'profile',
  component: ProfileComponent,
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
    ProfileComponent

  ],
  entryComponents: [
   

  ],
  providers: [
   
  ],
  exports: [
    
  ],
})
export class AccountModule {
  constructor(
  ) {

  }
}
