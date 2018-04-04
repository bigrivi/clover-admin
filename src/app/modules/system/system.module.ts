import { NgModule,InjectionToken } from '@angular/core';
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
import {TranslateService} from "../../@core/utils/translate.service"
import {AuthService} from '../../modules/auth/services/auth.service'
import {NbAuthSimpleToken,NbTokenService} from '../../modules/auth/services/token.service'

import {AuthGuardService} from "../../@core/services/auth-guard.service"
import {CommonModule} from "../common/common.module"

import {ProductConfig,CategoryConfig,TagConfig,OrderLogsConfig} from './apps/product/config'
import {UserInfoConfig,DepartmentConfig,UserRoleConfig,AuthNodeConfig,AuthorizeConfig} from './apps/account/config'
import {AttachmentConfig} from './apps/uploader/config'
import {NavConfig} from './apps/home/config'
import {ResearchConfig} from './apps/research/config'
import {TemplateConfig,EmailConfig,SmsConfig,WinningConfig} from './apps/notification/config'
import {QuestionConfig} from './apps/question/config'



let appConfig = {
  product :{
    product:ProductConfig,
    category:CategoryConfig,
    tag:TagConfig,
    orderLogs:OrderLogsConfig
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
  },
  question:{
    question:QuestionConfig
  },
  notification:{
    template:TemplateConfig,
    email:EmailConfig,
    sms:SmsConfig,
    winning:WinningConfig
  },
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
    appProviders.push( {name:providerName,resource:appName+"/"+moduleConfig.resource, config:moduleConfig});
  })
})


console.log("providers")
console.log(appProviders)


const routes: Routes = [
{
  path:"",component:SystemComponent,
  children:[
    { path: 'home',loadChildren: 'app/modules/system/apps/home/home.module#HomeModule' },
    { path: 'question', canActivate: [ AuthGuardService ],loadChildren: 'app/modules/system/apps/question/question.module#QuestionModule' },
    { path: 'account', canActivate: [ AuthGuardService ],loadChildren: 'app/modules/system/apps/account/account.module#AccountModule' },
    { path: 'research', canActivate: [ AuthGuardService ],loadChildren: 'app/modules/system/apps/research/research.module#ResearchModule' },
    { path: 'notification',canActivate: [ AuthGuardService ], loadChildren: 'app/modules/system/apps/notification/notification.module#NotificationModule' },
    {
      path: ':app',
      canActivate: [ AuthGuardService ],
      children: [
      {
        path: ':module/add',
        canActivate: [ AuthGuardService ],
        component: EditViewComponent,
      },
      {
        path: ':module/export',
        canActivate: [ AuthGuardService ],
        component: ExportViewComponent,
      },
       {
        path: ':module/:id/:submodule/export',
        canActivate: [ AuthGuardService ],
        component: ExportViewComponent,
      },
      {
        path: ':module/:id/edit',
        canActivate: [ AuthGuardService ],
        component: EditViewComponent,
      },
      {
        path: ':module/:id/:submodule',
        canActivate: [ AuthGuardService ],
        component: ListViewComponent,
      },
      {
        path: ':module/:id/:submodule/add',
        canActivate: [ AuthGuardService ],
        component: EditViewComponent,
      },
       {
        path: ':module/:id/:submodule/:subid/edit',
        canActivate: [ AuthGuardService ],
        component: EditViewComponent,
      },
      {
        path: ':module',
        canActivate: [ AuthGuardService ],
        component: ListViewComponent,
      }],
    }
  ]
},
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
      {
            provide: "DataApiService",
            useFactory: (http: Http,pubsub:PubSubService,authService:AuthService,tokenService:NbTokenService)=>{
               return new DataApiService(appProviders, http,pubsub,authService,tokenService);
            },
            deps: [Http,PubSubService,AuthService,NbTokenService]
        }
  ],
  exports: [

  ],
})
export class SystemModule {
  constructor(
  ) {

  }
}
