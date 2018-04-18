import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import {Observable} from 'rxjs'
import { Router, NavigationEnd,ActivatedRoute,RouterModule } from '@angular/router';
import {AppService} from '../../../common/services/app.service'
import {parseRouteMap} from '../../../common/utils/route.utils'
import {FormViewComponent} from '../../../common/component/form-view/form-view.component'
import {Subscription} from 'rxjs'
import {NzNotificationService,NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  module= "";
  app= "";
  config;
  routeMap;
  queryParams;
  routeChangeSub:Subscription


  constructor(public route: ActivatedRoute,
    public appService:AppService,
    @Inject("DataApiService") private dataApiService,
    public messageService: NzMessageService,
    public activatedRoute:ActivatedRoute,
    public router: Router)
  {
     this.routeMap = activatedRoute.snapshot.params

  }

  ngOnInit() {

  }


  switchTab(index){
    console.log("hahho"+index)
    if(index == 1){
      this.router.navigateByUrl(this.buildUrl("detail"))
    }
    else{
      this.router.navigateByUrl(this.buildUrl("orderLogs"))
    }
  }


  buildUrl(module){
    return `apps/${this.routeMap.app}/${this.routeMap.module}/${this.routeMap.id}/${module}`
  }


   ngOnDestroy(){
    if(this.routeChangeSub){
      this.routeChangeSub.unsubscribe()
      this.routeChangeSub = null;
    }

  }

}
