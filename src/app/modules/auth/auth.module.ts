import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ThemeModule } from '../../@theme/theme.module';
import { NbLayoutModule, NbCardModule, NbCheckboxModule } from '@nebular/theme';

import { AuthService } from './services/auth.service';
import { NbDummyAuthProvider } from './providers/dummy-auth.provider';
import { NbEmailPassAuthProvider } from './providers/email-pass-auth.provider';

import {
  defaultSettings,
  NB_AUTH_USER_OPTIONS_TOKEN,
  NB_AUTH_OPTIONS_TOKEN,
  NB_AUTH_PROVIDERS_TOKEN,
  NB_AUTH_TOKEN_WRAPPER_TOKEN,
  NbAuthOptions, NB_AUTH_INTERCEPTOR_HEADER,
} from './auth.options';

import { AuthComponent } from './components/auth.component';
import { NbAuthSimpleToken, NbTokenService } from './services/token.service';

import { NbAuthBlockComponent } from './components/auth-block/auth-block.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RequestPasswordComponent } from './components/request-password/request-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

import { routes } from './auth.routes';
import { deepExtend } from './helpers';

export function nbAuthServiceFactory(config: any, tokenService: NbTokenService, injector: Injector) {
  const providers = config.providers || {};
  console.log("createAuthService")
  for (const key in providers) {
    if (providers.hasOwnProperty(key)) {
      const provider = providers[key];
      const object = injector.get(provider.service);
      object.setConfig(provider.config || {});
    }
  }

  return new AuthService(tokenService, injector, providers);
}

export function nbOptionsFactory(options) {
  return deepExtend(defaultSettings, options);
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ThemeModule.forRoot(),
    HttpClientModule,
  ],
  declarations: [
    AuthComponent,
    NbAuthBlockComponent,
    LoginComponent,
    RegisterComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
    LogoutComponent,
  ],
  exports: [
    AuthComponent,
    NbAuthBlockComponent,
    LoginComponent,
    RegisterComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
    LogoutComponent,
  ],
})
export class NbAuthModule {
  static forRoot(nbAuthOptions?: NbAuthOptions): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NbAuthModule,
      providers: [
        { provide: NB_AUTH_USER_OPTIONS_TOKEN, useValue: nbAuthOptions },
        { provide: NB_AUTH_OPTIONS_TOKEN, useFactory: nbOptionsFactory, deps: [NB_AUTH_USER_OPTIONS_TOKEN] },
        { provide: NB_AUTH_PROVIDERS_TOKEN, useValue: {} },
        { provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useClass: NbAuthSimpleToken },
        { provide: NB_AUTH_INTERCEPTOR_HEADER, useValue: 'Authorization' },
        {
          provide: AuthService,
          useFactory: nbAuthServiceFactory,
          deps: [NB_AUTH_OPTIONS_TOKEN, NbTokenService, Injector],
        },
        NbTokenService,
        NbDummyAuthProvider,
        NbEmailPassAuthProvider,
      ],
    };
  }
}
