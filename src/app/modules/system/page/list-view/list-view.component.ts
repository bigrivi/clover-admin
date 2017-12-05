import { Component, OnInit } from '@angular/core';
import { Routes, Router,RouterModule,ActivatedRoute } from '@angular/router';
import {AppService} from '../../../common/services/app.service'
import {parseRouteMap} from '../../../common/utils/route.utils'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  //当前所在模块
  module= "";
  //当前所在app
  app="";
  config;
  routeChangeSub:Subscription
  constructor(   public router: Router, public route: ActivatedRoute,public appService:AppService ) {
    console.log(this.router.url)
    this.routeChangeSub = this.router.events.subscribe((event)=>{
      let routeMap = parseRouteMap(this.router.url)
      this.module = routeMap["module"];
      this.app = routeMap["app"];
      this.config = this.appService.getAppModuleConfig(this.app,this.module)
    })
  }

  ngOnInit() {
  }

  add() {
    let routeMap = parseRouteMap(this.router.url)
    this.router.navigate(["apps/"+routeMap.app+"/"+routeMap.module,"add"]);
  }

  ngOnDestroy(){
    if(this.routeChangeSub){
      this.routeChangeSub.unsubscribe()
      this.routeChangeSub = null;
    }

  }

}
