import { Component,ViewChild,Injector,OnInit} from '@angular/core';
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
import {AppService} from '../../../common/services/app.service'
import {UserService} from '../../../../@core/data/users.service'
import {FormViewComponent} from '../../../common/component/form-view/form-view.component'
import {NzNotificationService,NzMessageService} from 'ng-zorro-antd';
import { SettingsService } from '../../../../@core/services/settings.service';
import { HomeTZHIService } from './services/home.services';



@Component({
  selector: 'notification-home',
  templateUrl: './home.html',
  styleUrls: ['./home.less']
})
export class HomeComponent {
  config;
  params = {};
  loading = false;
  //模板
  templatedata: any = {};

  //邮件
  email: any = {};
  emailstatustotal = 0;
  emailchartdata: any[] = [];

  //短信
  sms: any = {};
  smsstatustotal = 0;
  smschartdata: any[] = [];

  //中奖
  winning: any = {};

  constructor(
    public route: ActivatedRoute,
    public injector:Injector,
    public appService:AppService,
    private homeTZHIService: HomeTZHIService,
    public settingsService: SettingsService,
    public messageService: NzMessageService,
    public userService:UserService ) {
        //this.config = this.injector.get("account.userInfoDataApi").config


  }


  ngOnInit() {
      this.homeTZHIService.getTemplateData().subscribe((result) => {
            this.templatedata = result;
        });
        this.homeTZHIService.getEamilData().subscribe((result) => {
            this.email = result;
            this.emailstatustotal = this.email.status.reduce((pre, now) => now.y + pre, 0);
            this.emailchartdata = this.email.chartdata;

        });
        this.homeTZHIService.getSMSData().subscribe((result) => {
            this.sms = result;
            this.smsstatustotal = this.sms.status.reduce((pre, now) => now.y + pre, 0);
            this.smschartdata = this.sms.chartdata;
        });
        this.homeTZHIService.getWinningData().subscribe((result) => {
            this.winning = result;
        });
  }

  _activeTab = 0;
  _tabChange(value: any) {

  }





}
