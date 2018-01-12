import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from 'angular-web-storage';
import { NbAuthModule } from '../modules/auth/auth.module';
import { CloverAuthProvider } from './clover-auth.provider';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { ResourceService } from './utils/resource.service';
import { PubSubService } from './utils/pubsub.service';
import { TranslateService } from './utils/translate.service';

import { SettingsService } from './services/settings.service';
import { ThemesService } from './services/themes.service';
import { ScrollService } from './services/scroll.service';
import { ColorsService } from './services/colors.service';
import { MenuService } from './services/menu.service';
import { _HttpClient } from './services/http.client';
import { ACLService } from './acl/acl.service';



const CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
   ...NbAuthModule.forRoot({
    providers: {
      email: {
        service: CloverAuthProvider,
        config: {
          delay: 0,
          redirect:"/apps/product/product",
          login: {
            rememberMe: true,
          },
        },
      },
    },
  }).providers,
   CloverAuthProvider,
  AnalyticsService,
  ResourceService,
  LocalStorageService,
  PubSubService,
  TranslateService,
  SettingsService,
  ThemesService,
  ScrollService,
  ColorsService,
  MenuService,
  ACLService,
  _HttpClient
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...CORE_PROVIDERS,
      ],
    };
  }
}
