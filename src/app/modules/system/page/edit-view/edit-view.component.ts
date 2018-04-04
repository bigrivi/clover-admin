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
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss']
})
export class EditViewComponent implements OnInit {
  module= "";
  app= "";
  config;
  params = {};
  routeMap;
  @ViewChild(FormViewComponent) formView:FormViewComponent;
  queryParams;
  routeChangeSub:Subscription


  constructor(public route: ActivatedRoute,
    public appService:AppService,
    @Inject("DataApiService") private dataApiService,
    public messageService: NzMessageService,
    public router: Router,) {

    this.routeMap = this.route.snapshot.params
    console.log(this.routeMap)
    this.module = this.routeMap["module"];
    if(this.routeMap["submodule"]){
        this.module = this.routeMap["submodule"]
    }
    this.app = this.routeMap["app"];
    let apiName = `${this.app}.${this.module}DataApi`;
    this.config = this.dataApiService.get(apiName).config

    this.route.params.subscribe(params => {
      this.params = params;
    });

    this.route.queryParams.subscribe(params=> {
      this.queryParams = params;
    })

    this.routeChangeSub = this.router.events.subscribe((event)=>{
      this.routeMap = this.route.snapshot.params
      this.module = this.routeMap["module"];
      if(this.routeMap["submodule"]){
        this.module = this.routeMap["submodule"]
      }
      this.app = this.routeMap["app"];
      let apiName = `${this.app}.${this.module}DataApi`;
      this.config = this.dataApiService.get(apiName).config
    })

  }

  ngOnInit() {

  }

  back(){
    //this.navigateToList()
    window.history.go(-1)
  }

  navigateToList(){
    if(this.routeMap["submodule"])
      this.router.navigate(["apps/"+this.routeMap.app+"/"+this.routeMap.module+"/"+this.routeMap["id"]+"/"+this.routeMap["submodule"]],{queryParams: this.queryParams})
    else
      this.router.navigate(["apps/"+this.routeMap.app+"/"+this.routeMap.module+"/"],{queryParams: this.queryParams})
  }

  save(){
    // console.log(this.formView.form.value)
    let apiName = `${this.config.app}.${this.config.module}DataApi`;
    let resource = this.dataApiService.get(apiName).resource
    if(this.formView.validata()){
        console.log(this.formView.form.value)
        if(this.params["id"] && !this.routeMap["submodule"] || this.routeMap["subid"]){ //update
            let id = this.routeMap["subid"]?this.routeMap["subid"]:this.params["id"]
            resource.put(id,this.formView.form.value).subscribe((res)=>{
              this.navigateToList()
               this.messageService.success('修改成功');
           })
        }
        else{
          let postData = Object.assign(this.formView.form.value,this.queryParams)
          if(this.routeMap["submodule"]){
            let moduleConfig = this.dataApiService.get(`${this.app}.${this.routeMap["module"]}DataApi`).config
            let forign_key = moduleConfig.resource+"_id"
            postData[forign_key] = this.params["id"]
          }
          resource.post(postData).subscribe((res)=>{
              this.navigateToList()
              this.messageService.success('保存成功');

           })
        }
    }

  }

   ngOnDestroy(){
    if(this.routeChangeSub){
      this.routeChangeSub.unsubscribe()
      this.routeChangeSub = null;
    }

  }

}
