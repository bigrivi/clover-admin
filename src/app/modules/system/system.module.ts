import { NgModule, InjectionToken,Injector } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import * as _ from 'lodash';

import { ListPageComponent } from './page/list/list-page.component';
import { ThemeModule } from '../../@theme/theme.module';
import { SystemComponent } from './system.component'
import { DataApiService } from '../../@core/utils/dataApi.service'

import { PubSubService } from "../../@core/utils/pubsub.service"
import { CommonService } from "../../@core/utils/common.service"
import { TranslateService } from "../../@core/utils/translate.service"
import { AuthService } from '../../modules/auth/services/auth.service'
import { NbAuthSimpleToken, NbTokenService } from '../../modules/auth/services/token.service'
import { AuthGuardService } from "../../@core/services/auth-guard.service"
import { CommonModule } from "../common/common.module"
import { ModuleConfig } from "./config"



// export function createDataApiProvider(http: Http,pubsub:PubSubService,authService:NbAuthService,tokenService:NbTokenService) {
//     return new DataApiService("fff", {}, http,pubsub,authService,tokenService);
// }

let apiConfigs = []
_.each(ModuleConfig, (modules, appName) => {
    _.each(modules, (moduleCfgService, moduleName) => {
        let providerName = appName + "." + moduleName + "DataApi"
        apiConfigs.push({ name: providerName, app: appName, module: moduleName, configServiceCls: moduleCfgService });
    })
})




const routes: Routes = [
    {
        path: "", component: SystemComponent,
        children: [
            { path: 'home', loadChildren: 'app/modules/system/apps/home/home.module#HomeModule' },
            { path: 'question', canActivate: [AuthGuardService], loadChildren: 'app/modules/system/apps/question/question.module#QuestionModule' },
            { path: 'account', canActivate: [AuthGuardService], loadChildren: 'app/modules/system/apps/account/account.module#AccountModule' },
            { path: 'research', canActivate: [AuthGuardService], loadChildren: 'app/modules/system/apps/research/research.module#ResearchModule' },
            { path: 'notification', canActivate: [AuthGuardService], loadChildren: 'app/modules/system/apps/notification/notification.module#NotificationModule' },
            {
                path: ':app',
                canActivate: [AuthGuardService],
                children: [
                    {
                        path: ':module/:id',
                        canActivate: [AuthGuardService],
                        loadChildren: "app/modules/system/page/detail/detail.module#DetailModule",
                    },
                    {
                        path: ':module',
                        canActivate: [AuthGuardService],
                        component: ListPageComponent,
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
        ListPageComponent
    ],
    entryComponents: [


    ],
    providers: [
        {
            provide: "DataApiService",
            useFactory: (http: Http, pubsub: PubSubService, authService: AuthService, tokenService: NbTokenService, commonService: CommonService,injector:Injector) => {
                return new DataApiService(apiConfigs, http, pubsub, authService, tokenService, commonService,injector);
            },
            deps: [Http, PubSubService, AuthService, NbTokenService, CommonService,Injector]
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
