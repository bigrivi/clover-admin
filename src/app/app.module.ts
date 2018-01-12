
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule,APP_INITIALIZER } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';
import {ToasterModule, ToasterService} from 'angular2-toaster';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StartupService } from './@core/services/startup.service';
export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.load();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ToasterModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    StartupService,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true
        }
  ],
})
export class AppModule {
}
