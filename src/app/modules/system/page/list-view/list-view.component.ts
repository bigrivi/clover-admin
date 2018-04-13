import { Component, OnInit,Inject,Injector,ViewChild,InjectionToken } from '@angular/core';
import { Routes, Router,RouterModule,ActivatedRoute,NavigationEnd } from '@angular/router';
import {AppService} from '../../../common/services/app.service'
import {parseRouteMap} from '../../../common/utils/route.utils'
import {UserService} from '../../../../@core/data/users.service'
import { DialogService } from "../../../common/component/dialog/dialog.service"
import { TableViewComponent } from "../../../common/component/table-view/table-view.component"
import {NzNotificationService,NzMessageService} from 'ng-zorro-antd';
import {Subscription} from 'rxjs'
import * as _ from 'lodash';

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
  routeMap;
  routeChangeSub:Subscription
  selectedObjs = [];
  addable = true;
  editable = true;
  deleteable = true;
  exportable = true;

  @ViewChild(TableViewComponent) tableView:TableViewComponent;
  constructor( public userService:UserService,
    public messageService:NzMessageService,
    public dialogService:DialogService ,
    public router: Router,
    public route: ActivatedRoute,
    public appService:AppService,
    @Inject("DataApiService") private dataApiService) {
    // console.log(this.router.url)
    this.routeChangeSub = this.router.events.subscribe((event)=>{
      if (event instanceof NavigationEnd) {
          //let routeMap = parseRouteMap(this.router.url)
          this.routeMap = this.route.snapshot.params
          this.module = this.routeMap["module"];
          this.app = this.routeMap["app"];
          if(this.routeMap["submodule"]){
              this.module = this.routeMap["submodule"]
          }
          let apiName = `${this.app}.${this.module}DataApi`;
          let dataApi = dataApiService.get(apiName)
          this.config = dataApi.config
      }

    })
  }

  ngOnInit() {
  }

  add() {
      let moduleConfig = this.dataApiService.get(`${this.app}.${this.routeMap["module"]}DataApi`).config
      if(this.routeMap["submodule"]){
        let forign_key = moduleConfig.resource+"_id"
        let params = {}
        params[forign_key] = this.routeMap["id"]
        this.dialogService.openEditDialog(this.routeMap.app,this.routeMap["submodule"],params).then(()=>{
           this.tableView.refresh()
        })
      }
      else{
        let params = {}
         if(moduleConfig.treeable){
           if (this.selectedObjs.length == 0 && this.tableView.rows.length>0) {
              this.messageService.error("必须选择一个父节点才能新增")
              return;
            }
            params["parentId"] = this.selectedObjs[0]._id
         }
        this.dialogService.openEditDialog(this.routeMap.app,this.routeMap.module,params).then(()=>{
          this.tableView.refresh()
          this.selectedObjs = []
        })


      }
  }

   edit() {
    if (this.selectedObjs.length == 0) {
      this.messageService.error("没有选择任何选项")
    }
    else if (this.selectedObjs.length >1) {
      this.messageService.error("同时只能选择一条记录修改")
    }
    else{
      if(this.routeMap["submodule"]){
        this.dialogService.openEditDialog(this.routeMap.app,this.routeMap.submodule,{id:this.selectedObjs[0]._id}).then(()=>{
          this.tableView.refresh()
        })
      }
      else{
         this.dialogService.openEditDialog(this.routeMap.app,this.routeMap.module,{id:this.selectedObjs[0]._id}).then(()=>{
          this.tableView.refresh()
        })
      }

    }



  }

  delete() {
    if (this.selectedObjs.length == 0) {
      this.messageService.error("没有选择任何选项")
    }
    else {
      this.dialogService.confirm("确认删除吗?").then((res) => {
        let deleteCount = this.selectedObjs.length;
        let resource = this.dataApiService.get(`${this.app}.${this.module}DataApi`).resource
        _.each(this.selectedObjs, (row) => {
          resource.delete(row._id).subscribe((res) => {
            deleteCount--;
            if (deleteCount <= 0) {
              this.tableView.refresh()
            }
          })
        })
        this.messageService.success('删除成功');
      }, (reason) => {
        console.log(reason)
      })
    }

  }


  onSelectedChange(event){
    this.selectedObjs = event
  }

  export(){
    if(this.routeMap["submodule"]){
        let moduleConfig = this.dataApiService.get(`${this.app}.${this.routeMap["module"]}DataApi`).config
        let forign_key = moduleConfig.resource+"_id"
        let params = {}
        params[forign_key+"__equals"] = this.routeMap["id"]
        this.dialogService.openExportDialog(this.routeMap.app,this.routeMap["submodule"],params).then(()=>{

        })
      }
      else{
         this.dialogService.openExportDialog(this.routeMap.app,this.routeMap.module,).then(()=>{

          })
      }
  }

  onDataLoadComplete(totalDataNum){
    let defaultOptions = {
      addable:true,
      editable:true,
      exportable:true,
      deleteable:true
    }
    let config = Object.assign(defaultOptions,this.config)
    let {addable,deleteable,exportable,editable} = config
    if(this.config.treeable){
      deleteable = false;
    }
    this.addable = addable && this.userService.checkNodeIsAuth(`${this.app}.${this.module}.post`)
    this.editable = editable && this.userService.checkNodeIsAuth(`${this.app}.${this.module}.put`)
    this.deleteable = deleteable && this.userService.checkNodeIsAuth(`${this.app}.${this.module}.delete`)
    this.exportable = exportable && this.userService.checkNodeIsAuth(`${this.app}.${this.module}.export`)

  }

  ngOnDestroy(){
    if(this.routeChangeSub){
      this.routeChangeSub.unsubscribe()
      this.routeChangeSub = null;
    }

  }

}
