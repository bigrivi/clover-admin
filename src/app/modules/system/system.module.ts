import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { ListViewComponent } from './page/list-view/list-view.component';
import { EditViewComponent } from './page/edit-view/edit-view.component';
import { ThemeModule } from '../../@theme/theme.module';
import { SystemComponent } from './system.component'


import {AuthGuardService} from "../common/services/auth-guard.service"
import {CommonModule} from "../common/common.module"

const routes: Routes = [
{ path: 'account',component: SystemComponent, loadChildren: 'app/modules/system/apps/account/account.module#AccountModule' },
{
  path: ':app',
  component: SystemComponent,
  canActivate: [ AuthGuardService ],
  children: [
  {
    path: ':module/add',
    component: EditViewComponent,
  }, {
    path: ':module/:id/edit',
    component: EditViewComponent,
  },{
    path: ':module',
    component: ListViewComponent,
  }],
}
];


@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SystemComponent,
    ListViewComponent,
    EditViewComponent
  ],
  entryComponents: [
   

  ],
  providers: [
   
  ],
  exports: [
    
  ],
})
export class SystemModule {
  constructor(
  ) {

  }
}
