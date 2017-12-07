import { Component, OnInit,ViewChild } from '@angular/core';
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs'
import { Router, NavigationEnd } from '@angular/router';
import {AppService} from '../../../common/services/app.service'
import {parseRouteMap} from '../../../common/utils/route.utils'
import {FormViewComponent} from '../../../common/component/form-view/form-view.component'
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import {ResourceService} from '../../../../@core/utils/resource.service'

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss']
})
export class EditViewComponent implements OnInit {
  module= "";
  app= "";
  config;
  params = {};
  @ViewChild(FormViewComponent) formView:FormViewComponent;
  queryParams;

  constructor(public route: ActivatedRoute,
    public appService:AppService,
    public toasterService:ToasterService,
    public resourceService:ResourceService,
    public router: Router,) {

    let routeMap = parseRouteMap(this.router.url)
    this.module = routeMap["module"];
    this.app = routeMap["app"];
    this.config = this.appService.getAppModuleConfig(this.app,this.module)

    this.route.params.subscribe(params => {
      this.params = params;
    });

    this.route.queryParams.subscribe(params=> {
      this.queryParams = params;
      console.log(params)
    })

  }

  ngOnInit() {

  }

  back(){
    this.navigateToList()
  }

  navigateToList(){
    let routeMap = parseRouteMap(this.router.url)
    this.router.navigate(["apps/"+routeMap.app+"/"+routeMap.module+"/"],{queryParams: this.queryParams})
  }

  save(){
    if(this.formView.validata()){
        if(this.params["id"]){
            this.resourceService.put(this.config.resource+"/"+this.params["id"],this.formView.form.value).subscribe((res)=>{
              this.navigateToList()
              this.toasterService.pop('success', '修改成功');
           })
        }
        else{
          let postData = Object.assign(this.formView.form.value,this.queryParams)
           // this.resourceService.post(this.confi)
          console.log(this.formView.form.value)
          console.log(postData)
           this.resourceService.post(this.config.resource,postData).subscribe((res)=>{
              this.navigateToList()
              this.toasterService.pop('success', '保存成功');
           })
        }
    }

  }

}
