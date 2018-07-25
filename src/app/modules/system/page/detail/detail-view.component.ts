import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs'
import * as _ from 'lodash';
import { Router, NavigationEnd } from '@angular/router';
import {parseRouteMap} from '../../../common/utils/route.utils'
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
  groups = []
  infoData = {}


  constructor(public route: ActivatedRoute,
    @Inject("DataApiService") private dataApiService,
    public messageService: NzMessageService,
    public router: Router,) {

      this.app = this.route.snapshot.parent.params["app"]
      this.id = this.route.snapshot.parent.params["id"]
      this.module = this.route.snapshot.parent.params["module"]
      let apiName = `${this.app}.${this.module}DataApi`;
      let dataApi = dataApiService.get(apiName)
      this.config = _.cloneDeep(dataApi.config);
      let groupNames = this.config.group?this.config.group:["基本信息"];
      let groups = []
      groupNames.forEach((item)=>{
          groups.push({name:item,fields:[]})
      })
       this.fields = Object.keys(this.config["fields"]);
       this.fields = this.fields.map((field)=>{
          let src = this.config["fields"][field]
          let clone = Object.assign({},src)
          clone.formWidth = !_.isUndefined(src.formWidth) ? clone.formWidth : "fullRow";
          clone.field = field
          return clone;
      })

      this.fields.forEach(config => {
        let groupIndex = (Number(config.group)-1) || 0
        groups[groupIndex].fields.push(config)
      });
      groups.forEach((group)=>{
          let fields = group.fields;
          group.rows = []
          let index = 0
          fields.forEach((field)=>{
              let prevRowIndex = group.rows.length-1
              if(index == 0 || prevRowIndex<0){
                  group.rows.push([field])
              }
              else if(index==1){
                  group.rows[prevRowIndex].push(field)
              }
              if(index ==1 || field.formWidth == "fullRow" || field.formWidth == "halfWidth_"){
                  index = -1
              }
              index++;
          })
      })
      this.groups = groups
      console.log(this.groups)



  }

  ngOnInit() {
    this.loadData()
  }

  loadData(){
    let  populates= _.filter(this.fields,(item)=>{
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
          _.each(data,(val,field)=>{
              let fieldCfg = this.config["fields"][field]
              if(fieldCfg && fieldCfg.get_display){
                data[field] = this.config["fields"][field].get_display(data)
                console.log(field)
              }
          })
          this.infoData = data
      })
  }




}
