import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { ProfileComponent } from './profile.component'
import { AuthorizeComponent } from './authorize.component'
import { HomeComponent } from './home.component'

import { SystemModule } from '../../system.module'
import { ThemeModule } from '../../../../@theme/theme.module';
import {CommonModule} from "../../../common/common.module"


const routes: Routes = [
{
  path: 'profile',
  component: ProfileComponent,
  children: [],
},
{
  path: 'home',
  component: HomeComponent,
  children: [],
},
{
  path: 'userRole/:id/authorize',
  component: AuthorizeComponent,
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
    ProfileComponent,
    AuthorizeComponent,
    HomeComponent

  ],
  entryComponents: [
    AuthorizeComponent

  ],
  providers: [

  ],
  exports: [
    AuthorizeComponent
  ],
})
export class AccountModule {
  constructor(
  ) {

  }
}
