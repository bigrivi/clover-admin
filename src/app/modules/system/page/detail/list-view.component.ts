import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs'
import { Router, NavigationEnd } from '@angular/router';
import {AppService} from '../../../common/services/app.service'
import {parseRouteMap} from '../../../common/utils/route.utils'
import {FormViewComponent} from '../../../common/component/form-view/form-view.component'
import {Subscription} from 'rxjs'
import {NzNotificationService,NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-detail-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  module= "";
  app= "";
  id = "";
  parentModule = ""
  config;
  params = {};


  constructor(public route: ActivatedRoute,
    public appService:AppService,
    @Inject("DataApiService") private dataApiService,
    public messageService: NzMessageService,
    public router: Router) {

      this.module = this.route.snapshot.params["module"]
      this.app = this.route.snapshot.parent.params["app"]
      this.id = this.route.snapshot.parent.params["id"]
      this.parentModule = this.route.snapshot.parent.params["module"]
      let apiName = `${this.app}.${this.module}DataApi`;
      let dataApi = dataApiService.get(apiName)
      this.config = dataApi.config

  }

  ngOnInit() {

  }







}
