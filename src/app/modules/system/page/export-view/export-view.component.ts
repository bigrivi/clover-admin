import { Component, OnInit,ViewChild,Injector } from '@angular/core';
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs'
import { Router, NavigationEnd } from '@angular/router';
import { Http, Request,URLSearchParams, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import {AppService} from '../../../common/services/app.service'
import {parseRouteMap} from '../../../common/utils/route.utils'
import {FormViewComponent} from '../../../common/component/form-view/form-view.component'
import {Subscription} from 'rxjs'
import * as _ from 'lodash';
import {environment} from "../../../../../environments/environment"

@Component({
  selector: 'app-export-view',
  templateUrl: './export-view.component.html',
  styleUrls: ['./export-view.component.scss']
})
export class ExportViewComponent implements OnInit {
  module= "";
  app= "";
  config;
  fields = [];
  fieldsExpand = true
  optionExpand = true
  sortExpand = true
  skipHeader = true; //去掉表格头
  encodingTo = ""; //导出编码
  colSep = ""; //列分割副
  sortField = "_id";//排序字段
  sort = "desc"


  constructor(public route: ActivatedRoute,
    public appService:AppService,
    public injector:Injector,
    public router: Router) {
      let routeMap = parseRouteMap(this.router.url)
      this.module = routeMap["module"];
      this.app = routeMap["app"];
      let apiName = `${this.app}.${this.module}DataApi`;
      this.config = this.injector.get(apiName).config
      let fieldKeys = Object.keys(this.config["fields"]);
      let fields = []
      fields = fieldKeys.map((item) => {
        let clone = _.cloneDeep(this.config["fields"][item])
        clone.field = item
        clone.checked = true
        return clone;
      })
      fields = _.filter(fields,(item)=>{
          let listHide = this.config.listHide || []
          return listHide.indexOf(item.field)<0;
      })
      fields.unshift({field:"_id",label:"Id",checked:true})
      this.fields = fields


  }

  ngOnInit() {

  }

  back(){
    window.history.go(-1)
  }

  toggleFieldsShow(){
    this.fieldsExpand = !this.fieldsExpand
  }

  toggleOptionShow(){
    this.optionExpand = !this.optionExpand
  }

  toggleSortShow(){
    this.sortExpand = !this.sortExpand
  }

  fanxuan(){
    this.fields.forEach((item)=>{
      item.checked = !item.checked;
    })
  }


  //导出类型
  //csv/excel/json/xml
  export(format){
    let fields = this.fields.filter((item)=>{return item.checked}).map((item)=>{return item.field})
    let  populates= _.filter(fields,(field)=>{
        if(field=="_id")
          return false;
        return this.config["fields"][field].populateable?true:false
    })

    let  fieldNames= _.map(fields,(field)=>{
        if(field=="_id")
          return "Id";
        return this.config["fields"][field].label
    })

    let formData = {
      fields:fields.join(","),
      fieldNames:fieldNames.join(","),
      resource:this.config.resource,
      app:this.config.app,
      skipHeader:this.skipHeader,
      encodingTo:this.encodingTo,
      colSep:this.colSep,
      sortField:this.sortField,
      sort:this.sort,
      populates:populates.join(","),
      format:format
    }

    let apiName = `${this.config.app}.${this.config.module}DataApi`;
    let resource = this.injector.get(apiName).resource
    var url = environment.API_ROOT+resource.resourceApi+"/export?"+resource.formEncode(formData);

    var anchorElement = document.createElement('a');
    anchorElement.href = url;
    anchorElement.target="_parent"
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);

  }




}
