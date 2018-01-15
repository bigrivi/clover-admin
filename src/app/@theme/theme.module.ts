import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';


import { HeaderComponent } from './components/header/header.component';
import { HeaderMainComponent } from './components/header/header-main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarNavComponent } from './components/sidebar/nav/nav.component';
import { HeaderModuleComponent } from './components/header/components/module.component';
import { HeaderThemeComponent } from './components/header/components/theme.component';
import { HeaderNotifyComponent } from './components/header/components/notify.component';
import { HeaderIconComponent } from './components/header/components/icon.component';
import { HeaderLangsComponent } from './components/header/components/langs.component';
import { HeaderUserComponent } from './components/header/components/user.component';
import { ProHeaderComponent } from './components/pro-header/pro-header.component';



import {
    // LoggerModule,
    // NzLocaleModule,
    NzButtonModule,
    NzAlertModule,
    NzBadgeModule,
    // NzCalendarModule,
    NzCascaderModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzGridModule,
    NzMessageModule,
    NzModalModule,
    NzNotificationModule,
    NzPaginationModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzRadioModule,
    NzRateModule,
    NzSelectModule,
    NzSpinModule,
    NzSliderModule,
    NzSwitchModule,
    NzProgressModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    NzTimePickerModule,
    NzUtilModule,
    NzStepsModule,
    NzDropDownModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    NzRootModule,
    NzCarouselModule,
    // NzCardModule,
    NzCollapseModule,
    NzTimelineModule,
    NzToolTipModule,
    // NzBackTopModule,
    // NzAffixModule,
    // NzAnchorModule,
    NzAvatarModule,
    // SERVICES
    NzNotificationService,
    NzMessageService
} from 'ng-zorro-antd';


const ZORROMODULES = [
    // LoggerModule,
    // NzLocaleModule,
    NzButtonModule,
    NzAlertModule,
    NzBadgeModule,
    // NzCalendarModule,
    NzCascaderModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzGridModule,
    NzMessageModule,
    NzModalModule,
    NzNotificationModule,
    NzPaginationModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzRadioModule,
    NzRateModule,
    NzSelectModule,
    NzSpinModule,
    NzSliderModule,
    NzSwitchModule,
    NzProgressModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    NzTimePickerModule,
    NzUtilModule,
    NzStepsModule,
    NzDropDownModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    NzRootModule,
    NzCarouselModule,
    // NzCardModule,
    NzCollapseModule,
    NzTimelineModule,
    NzToolTipModule,
    // NzBackTopModule,
    // NzAffixModule,
    // NzAnchorModule,
    NzAvatarModule
];


import { CapitalizePipe, PluralPipe, RoundPipe, TimingPipe,TranslatePipe } from './pipes';
import {
  BaseLayoutComponent,LayoutComponent,LayoutMainComponent
} from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule,RouterModule];

const HEADERCOMPONENTS = [
    HeaderModuleComponent,
    HeaderNotifyComponent,
    HeaderIconComponent,
    HeaderThemeComponent,
    HeaderLangsComponent,
    HeaderUserComponent
];

import { ProUserLayoutComponent } from './components/pro/user/user.component';
const PRO = [
    ProUserLayoutComponent
];


const COMPONENTS = [
  ProHeaderComponent,
  LayoutComponent,
  LayoutMainComponent,
  HeaderComponent,
  HeaderMainComponent,
  SidebarComponent,
  SidebarNavComponent,
  ...HEADERCOMPONENTS,
  ...PRO
];

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  TranslatePipe
];

// const NB_THEME_PROVIDERS = [
//   ...NbThemeModule.forRoot(
//     {
//       name: 'default',
//     },
//     [ DEFAULT_THEME, COSMIC_THEME ],
//   ).providers,
//   ...NbSidebarModule.forRoot().providers,
//   ...NbMenuModule.forRoot().providers,
// ];

@NgModule({
  imports: [...BASE_MODULES, ...ZORROMODULES],
  exports: [...BASE_MODULES,...ZORROMODULES, ...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [NzNotificationService,NzMessageService],
    };
  }
}
