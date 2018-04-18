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
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {
  module= "";
  app= "";
  config;
  params = {};
  routeMap;
  queryParams;
  routeChangeSub:Subscription


  constructor(public route: ActivatedRoute,
    public appService:AppService,
    @Inject("DataApiService") private dataApiService,
    public messageService: NzMessageService,
    public router: Router,) {

    // this.routeMap = this.route.snapshot.params
    // console.log(this.routeMap)
    // this.module = this.routeMap["module"];
    // if(this.routeMap["submodule"]){
    //     this.module = this.routeMap["submodule"]
    // }
    // this.app = this.routeMap["app"];
    // let apiName = `${this.app}.${this.module}DataApi`;
    // this.config = this.dataApiService.get(apiName).config

    // this.route.params.subscribe(params => {
    //   this.params = params;
    // });

    // this.route.queryParams.subscribe(params=> {
    //   this.queryParams = params;
    // })

    // this.routeChangeSub = this.router.events.subscribe((event)=>{
    //   this.routeMap = this.route.snapshot.params
    //   this.module = this.routeMap["module"];
    //   if(this.routeMap["submodule"]){
    //     this.module = this.routeMap["submodule"]
    //   }
    //   this.app = this.routeMap["app"];
    //   let apiName = `${this.app}.${this.module}DataApi`;
    //   this.config = this.dataApiService.get(apiName).config
    // })

  }

  ngOnInit() {

  }





   ngOnDestroy(){
    if(this.routeChangeSub){
      this.routeChangeSub.unsubscribe()
      this.routeChangeSub = null;
    }

  }

}
