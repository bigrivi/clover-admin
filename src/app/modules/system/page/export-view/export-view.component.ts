import { Component, OnInit,ViewChild } from '@angular/core';
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs'
import { Router, NavigationEnd } from '@angular/router';
import {AppService} from '../../../common/services/app.service'
import {parseRouteMap} from '../../../common/utils/route.utils'
import {FormViewComponent} from '../../../common/component/form-view/form-view.component'
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import {ResourceService} from '../../../../@core/utils/resource.service'
import {Subscription} from 'rxjs'
import * as _ from 'lodash';

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
  skipHeader = true; //去掉表格头
  encodingTo = ""; //导出编码
  colSep = ""; //列分割副


  constructor(public route: ActivatedRoute,
    public appService:AppService,
    public toasterService:ToasterService,
    public resourceService:ResourceService,
    public router: Router,) {
      let routeMap = parseRouteMap(this.router.url)
      this.module = routeMap["module"];
      this.app = routeMap["app"];
      this.config = this.appService.getAppModuleConfig(this.app,this.module)
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

  fanxuan(){
    this.fields.forEach((item)=>{
      item.checked = !item.checked;
    })
  }


  //导出类型
  //csv/excel/json/xml
  export(format){
    console.log("export format:"+format)
    let fields = this.fields.filter((item)=>{return item.checked}).map((item)=>{return item.field}).join(",")
    let formData = {
      fields:fields,
      resource:this.config.resource,
      skipHeader:this.skipHeader,
      encodingTo:this.encodingTo,
      colSep:this.colSep
    }
    console.log(formData)

  }




}
