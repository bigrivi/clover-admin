import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { PubSubService } from './@core/utils/pubsub.service';
import { TranslateService } from './@core/utils/translate.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

@Component({
  selector: 'ngx-app',
  template: `
      <toaster-container [toasterconfig]="toasterconfig"></toaster-container>
      <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
   toasterconfig: ToasterConfig = new ToasterConfig({
      positionClass: "toast-top-right",
      timeout: 2000,
      animation: "fade",
    });
  constructor(private analytics: AnalyticsService,private toasterService:ToasterService,private translateService:TranslateService,private pubSubService:PubSubService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.translateService.loadLangs()
    this.pubSubService.errorToast.subscribe(data => {
      this.toasterService.pop('error', data as string);
    });
  }
}
