import { Component,Input, OnInit,Inject,Injector,ViewChild,InjectionToken } from '@angular/core';
import {parseRouteMap} from '../../../common/utils/route.utils'
import {UserService} from '../../../../@core/data/users.service'
import { DialogService } from "../../../common/component/dialog/dialog.service"
import { TableViewComponent } from "../../../common/component/table-view/table-view.component"
import {NzNotificationService,NzMessageService} from 'ng-zorro-antd';
import {Subscription} from 'rxjs'
import * as _ from 'lodash';

@Component({
  selector: 'listView',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  @Input() config;
  @Input() parentId;
  @Input() parentModule;
  selectedObjs = [];
  addable = true;
  editable = true;
  deleteable = true;
  exportable = true;
  params = {}

  @ViewChild(TableViewComponent) tableView:TableViewComponent;
  constructor( public userService:UserService,
    public messageService:NzMessageService,
    public dialogService:DialogService ,
    @Inject("DataApiService") private dataApiService) {
    // console.log(this.router.url)


  }

  ngOnInit() {
      if(this.parentModule){
          let parentModule = this.dataApiService.get(`${this.config.app}.${this.parentModule}DataApi`).config
          let forign_key = parentModule.resource+"_id"
          this.params = {}
          this.params[forign_key] = this.parentId
      }

  }

  add() {
      if(this.parentId){
        let parentModule = this.dataApiService.get(`${this.config.app}.${this.parentModule}DataApi`).config
        let forign_key = parentModule.resource+"_id"
        let params = {}
        params[forign_key] = this.parentId
        this.dialogService.openEditDialog(this.config.app,this.config.module,params).then(()=>{
           this.tableView.refresh()
        })
      }
      else{
        let params = {}
         if(this.config.treeable){
           if (this.selectedObjs.length == 0 && this.tableView.rows.length>0) {
              this.messageService.error("必须选择一个父节点才能新增")
              return;
            }
            params["parentId"] = this.selectedObjs[0]._id
         }
        this.dialogService.openEditDialog(this.config.app,this.config.module,params).then(()=>{
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
       this.dialogService.openEditDialog(this.config.app,this.config.module,{id:this.selectedObjs[0]._id}).then(()=>{
        this.tableView.refresh()
      })


    }



  }

  delete() {
    if (this.selectedObjs.length == 0) {
      this.messageService.error("没有选择任何选项")
    }
    else {
      this.dialogService.confirm("确认删除吗?").then((res) => {
        let deleteCount = this.selectedObjs.length;
        let resource = this.dataApiService.get(`${this.config.app}.${this.config.module}DataApi`).resource
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
    if(this.parentId){
        let parentModule = this.dataApiService.get(`${this.config.app}.${this.parentModule}DataApi`).config
        let forign_key = parentModule.resource+"_id"
        let params = {}
        params[forign_key+"__equals"] = this.parentId
        this.dialogService.openExportDialog(this.config.app,this.config.module,params).then(()=>{

        })
      }
      else{
         this.dialogService.openExportDialog(this.config.app,this.config.module,).then(()=>{

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
    this.addable = addable && this.userService.checkNodeIsAuth(`${this.config.app}.${this.config.module}.post`)
    this.editable = editable && this.userService.checkNodeIsAuth(`${this.config.app}.${this.config.module}.put`)
    this.deleteable = deleteable && this.userService.checkNodeIsAuth(`${this.config.app}.${this.config.module}.delete`)
    this.exportable = exportable && this.userService.checkNodeIsAuth(`${this.config.app}.${this.config.module}.export`)

  }



}
