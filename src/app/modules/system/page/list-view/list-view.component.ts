import { Component, OnInit,Inject,Injector } from '@angular/core';
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
  addable = true;
  constructor(   public router: Router, public route: ActivatedRoute,public appService:AppService,public injector: Injector, ) {
    console.log(this.router.url)
    this.routeChangeSub = this.router.events.subscribe((event)=>{
      let routeMap = parseRouteMap(this.router.url)
      this.module = routeMap["module"];
      this.app = routeMap["app"];
      let apiName = `${this.app}.${this.module}DataApi`;
      this.config = this.injector.get(apiName).config
    })
  }

  ngOnInit() {
  }

  add() {
    let routeMap = parseRouteMap(this.router.url)
    this.router.navigate(["apps/"+routeMap.app+"/"+routeMap.module,"add"]);
  }

  export(){
    let routeMap = parseRouteMap(this.router.url)
    this.router.navigate(["apps/"+routeMap.app+"/"+routeMap.module,"export"]);
  }

  onDataLoadComplete(totalDataNum){
    if(this.config.treeable){
      if(totalDataNum>0)
        this.addable = false;
      else
        this.addable = true;
    }
    else
      this.addable = true;
  }

  ngOnDestroy(){
    if(this.routeChangeSub){
      this.routeChangeSub.unsubscribe()
      this.routeChangeSub = null;
    }

  }

}
