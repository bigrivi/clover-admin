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
import {AuthService} from '../../modules/auth/services/auth.service'
import {NbAuthSimpleToken,NbTokenService} from '../../modules/auth/services/token.service'

import {AuthGuardService} from "../common/services/auth-guard.service"
import {CommonModule} from "../common/common.module"

import {ProductConfig,CategoryConfig,TagConfig} from './apps/product/config'
import {UserInfoConfig,DepartmentConfig,UserRoleConfig,AuthNodeConfig,AuthorizeConfig} from './apps/account/config'
import {AttachmentConfig} from './apps/uploader/config'
import {NavConfig} from './apps/home/config'
import {ResearchConfig} from './apps/research/config'


let appConfig = {
  product :{
    product:ProductConfig,
    category:CategoryConfig,
    tag:TagConfig
  },
  account:{
    userInfo:UserInfoConfig,
    userRole:UserRoleConfig,
    department:DepartmentConfig,
    authNode:AuthNodeConfig,
    authorize:AuthorizeConfig
  },
  home:{
    nav:NavConfig
  },
  uploader:{
    attachment:AttachmentConfig
  },
  research:{
    research:ResearchConfig
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
            useFactory: (http: Http,pubsub:PubSubService,authService:AuthService,tokenService:NbTokenService)=>{
               return new DataApiService(appName+"/"+moduleConfig.resource, moduleConfig, http,pubsub,authService,tokenService);
            },
            deps: [Http,PubSubService,AuthService,NbTokenService]
        })
  })
})


const routes: Routes = [
{
  path:"",component:SystemComponent,
  children:[
    { path: 'account', loadChildren: 'app/modules/system/apps/account/account.module#AccountModule' },
    { path: 'research', loadChildren: 'app/modules/system/apps/research/research.module#ResearchModule' },
    {
      path: ':app',
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
  ]
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
