import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import * as _ from 'lodash';

import { ListViewComponent } from './page/list-view/list-view.component';
import { EditViewComponent } from './page/edit-view/edit-view.component';
import { ExportViewComponent } from './page/export-view/export-view.component';
import { ThemeModule } from '../../@theme/theme.module';
import { SystemComponent } from './system.component'
import { DataApiService } from '../../@core/utils/dataApi.service'

import {PubSubService} from "../../@core/utils/pubsub.service"
import {NbAuthService} from '../../modules/auth/services/auth.service'
import {NbAuthSimpleToken,NbTokenService} from '../../modules/auth/services/token.service'

import {AuthGuardService} from "../common/services/auth-guard.service"
import {CommonModule} from "../common/common.module"

import {ProductConfig,CategoryConfig,TagConfig} from './apps/product/config'
import {UserInfoConfig,DepartmentConfig} from './apps/account/config'

let appConfig = {
  product :{
     product:ProductConfig,
      category:CategoryConfig,
      tag:TagConfig
  },
  account:{
     userInfo:UserInfoConfig,
     department:DepartmentConfig
  }
}

// export function createDataApiProvider(http: Http,pubsub:PubSubService,authService:NbAuthService,tokenService:NbTokenService) {
//     return new DataApiService("fff", {}, http,pubsub,authService,tokenService);
// }

let appProviders = []
_.each(appConfig,(modules,appName)=>{
  _.each(modules,(moduleConfig,moduleName)=>{
    moduleConfig.app = appName;
    moduleConfig.module = moduleName;
    let providerName = appName+"."+moduleName+"DataApi"
    appProviders.push( {
            provide: providerName,
            useFactory: (http: Http,pubsub:PubSubService,authService:NbAuthService,tokenService:NbTokenService)=>{
               return new DataApiService(moduleConfig.resource, moduleConfig, http,pubsub,authService,tokenService);
            },
            deps: [Http,PubSubService,NbAuthService,NbTokenService]
        })
  })
})


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
    path: ':module/export',
    component: ExportViewComponent,
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
    EditViewComponent,
    ExportViewComponent
  ],
  entryComponents: [
   

  ],
  providers: [
     ...appProviders
  ],
  exports: [
    
  ],
})
export class SystemModule {
  constructor(
  ) {

  }
}
