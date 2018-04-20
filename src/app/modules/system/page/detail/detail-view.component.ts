import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs'
import * as _ from 'lodash';
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
  id = "";
  fields = [];


  constructor(public route: ActivatedRoute,
    public appService:AppService,
    @Inject("DataApiService") private dataApiService,
    public messageService: NzMessageService,
    public router: Router,) {

      this.app = this.route.snapshot.parent.params["app"]
      this.id = this.route.snapshot.parent.params["id"]
      this.module = this.route.snapshot.parent.params["module"]
      let apiName = `${this.app}.${this.module}DataApi`;
      let dataApi = dataApiService.get(apiName)
      this.config = dataApi.config

       this.fields = Object.keys(this.config["fields"]);
       this.fields = this.fields.map((field)=>{
          let src = this.config["fields"][field]
          let clone = Object.assign({},src)
          clone.field = field
          return clone;
      })
      console.log(this.fields)


  }

  ngOnInit() {
    this.loadData()
  }

  loadData(){
    let  populates= _.filter(this.config.fields,(item)=>{
        return item.populateable
    })
    populates = _.map(populates,(item)=>{
      return item.field
    })
    let requestUrl = this.config.resource+"/"+this.id
    if(populates.length>0)
      requestUrl+= "?populate="+populates.join(" ")
    let apiName = `${this.config.app}.${this.config.module}DataApi`;
    let resource = this.dataApiService.get(apiName).resource
    let id = this.id;
    resource.get({populate:populates.join(" ")},"/"+id).subscribe((res)=>{
          let data = res.json().data
           console.log(data)
      })
  }




}
