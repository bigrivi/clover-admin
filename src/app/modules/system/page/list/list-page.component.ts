import { Component, OnInit,Inject,Injector,ViewChild,InjectionToken } from '@angular/core';
import { Routes, Router,RouterModule,ActivatedRoute,NavigationEnd } from '@angular/router';
import {AppService} from '../../../common/services/app.service'
import {parseRouteMap} from '../../../common/utils/route.utils'
import {UserService} from '../../../../@core/data/users.service'
import { DialogService } from "../../../common/component/dialog/dialog.service"
import {NzNotificationService,NzMessageService} from 'ng-zorro-antd';
import {Subscription} from 'rxjs'
import * as _ from 'lodash';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent{

  config;
  routeMap;
  routeChangeSub:Subscription

  constructor( public userService:UserService,
    public messageService:NzMessageService,
    public dialogService:DialogService ,
    public router: Router,
    public injector:Injector,
    public route: ActivatedRoute,
    public appService:AppService,
    @Inject("DataApiService") private dataApiService) {
    this.routeChangeSub = this.router.events.filter((event)=>{
        return event instanceof NavigationEnd
    }).subscribe((event)=>{
        this.routeMap = this.route.snapshot.params
        let module = this.routeMap["module"];
        let app = this.routeMap["app"];
        console.log("NavigationEnd app:"+app+" module:"+module)
        if(app && module){
            if(this.routeMap["submodule"]){
                module = this.routeMap["submodule"]
            }
            let apiName = `${app}.${module}DataApi`;
            let dataApi = this.dataApiService.get(apiName)
            this.config = dataApi.config
        }
    })
  }


  ngOnDestroy(){
    if(this.routeChangeSub){
      this.routeChangeSub.unsubscribe()
      this.routeChangeSub = null;
    }

  }

}
