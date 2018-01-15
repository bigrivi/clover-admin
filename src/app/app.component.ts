import { Component, OnInit,HostBinding } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { PubSubService } from './@core/utils/pubsub.service';
import { TranslateService } from './@core/utils/translate.service';
import { SettingsService } from './@core/services/settings.service';
import {NzNotificationService,NzMessageService} from 'ng-zorro-antd';



@Component({
  selector: 'ngx-app',
  template: `
      <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  @HostBinding('class.layout-fixed') get isFixed() { return this.settings.layout.fixed; }
  @HostBinding('class.layout-boxed') get isBoxed() { return this.settings.layout.boxed; }
  @HostBinding('class.aside-collapsed') get isCollapsed() { return this.settings.layout.collapsed; }

  constructor(private settings: SettingsService,
    private analytics: AnalyticsService,
    private messageService:NzMessageService,
    private translateService:TranslateService,
    private pubSubService:PubSubService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.pubSubService.errorToast.subscribe(data => {
      this.messageService.error(data as string)
    });
  }
}
