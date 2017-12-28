import { Component,Inject,Injector, OnInit,EventEmitter, ViewChild, ViewContainerRef, Renderer2, ElementRef, Input,Output,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Location } from '@angular/common';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { DialogService } from "../dialog/dialog.service"
import * as _ from 'lodash';
import {Subscription} from 'rxjs'
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import {RestfulService} from '@core/utils/resource.service'
import {AppService} from '../../services/app.service'
import {formatDate} from '../../utils/date.utils'
import {parseRouteMap} from '../../utils/route.utils'

const PAGE_SIZE = 10;
@Component({
  selector: 'table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  host: {
    class: 'table-view'
  }
})
export class TableViewComponent implements OnInit {

  constructor(
   public injector: Injector,
   public toasterService: ToasterService,
   public renderer: Renderer2, 
   public el: ElementRef, 
   public location: Location,
   public http: Http, 
   public sidebarService:NbSidebarService,
   public router: Router, 
   public activeRouter: ActivatedRoute,
   public appService:AppService,
   public ref: ChangeDetectorRef,
   public dialogService: DialogService) { 
    
  }
  _config;
  resource;

  @Output() dataLoadComplete:EventEmitter<any> = new EventEmitter();
  @Output() onSelectedChange:EventEmitter<any> = new EventEmitter();
  @Input() rowHeight = 50;
  @Input() initSelectedIds = [];
  @Input() modalMode = false; //是否为弹窗模式
  @Input()
  set config(val) {
    this._config = _.cloneDeep(val);
    let apiName = `${this._config.app}.${this._config.module}DataApi`;
    this.resource = this.injector.get(apiName).resource 
    this._config.listHide = this._config.listHide || [];
    this._config.modalListShow = this._config.modalListShow || [];
    this._config.actionable = this._config.actionable || true; //出现操作列
    this._config.selecteable = this._config.selecteable || true; //出现checkbox选择列
    this._config.addable = this._config.addable || true; //出现新增按钮
    this._config.filters = this._config.filters || []; //过滤器
    this._config.treeable = this._config.treeable || false; //是否是树
    this.filters = {}
    this.queryIn = {}
    this.rows = [];
    this.dataReady = false;
    this.selectedAll = false;
    this.sorting = {key:"",value:""}
    let fields = Object.keys(this._config["fields"]);
    if(this.modalMode){
      this._config.actionable = false;
    }
    this.columns = fields.map((item) => {
      let clone = _.cloneDeep(this._config["fields"][item])
      clone.field = item
      clone.width = clone.width || 200;
      clone.value = clone.value || ""
      return clone;
    })
    this.columns = _.filter(this.columns,(item)=>{
        return this._config.listHide.indexOf(item.field)<0;
    })
    if(this.modalMode && this._config.modalListShow.length>0){
      this.columns = _.filter(this.columns,(item)=>{
          return this._config.modalListShow.indexOf(item.field)>=0;
      })
    }
    if (this._config.actionable) {
      let width = this._config.treeable?300:200
      this.columns.push({
        field: "action",
        label: "操作",
        width: width,
        fixedRight: true
      })
    }

    if (this._config.selecteable && !this._config.treeable) {
      this.columns.unshift({
        field: "selectedId",
        label: "",
        width: 50,
      })
    }

    _.forEach(this._config.filters,(item)=>{
       let dataSource = item.dataSource
	   item.dataSourceOrigin = dataSource
       this.filters[item.key] = "";
       if(!_.isArray(dataSource)){
         item.dataSource = []
         let moduleArr = dataSource.split(".")
         let moduleConfig = this.appService.getAppModuleConfig(moduleArr[0],moduleArr[1])
         let apiName = `${moduleArr[0]}.${moduleArr[1]}DataApi`;
         let resource = this.injector.get(apiName).resource
         resource.get({},item.tree?"/getTreeNode":"").map((res)=>res.json().result)
         .subscribe((res)=>{
             if(item.tree){
               item.dataSource = res;
             }else{
               item.dataSource = _.map(res,(data)=>{
                   let label = data[moduleConfig.labelField||"name"];
                   let value = data[moduleConfig.valueField||"_id"];
                   if(item.get_display){
                     label = item.get_display(data)
                   }
                   return {
                     label:label,
                     value:value
                   }

               })
             }
             
         })
       }
    })

    this.fixedLeft = this.columns.filter((column) => {
      return column["fixedLeft"] == true;
    })

    this.fixedRight = this.columns.filter((column) => {
      return column["fixedRight"] == true;
    })
    this.pagerData = {
      currentPage: 1,
      recordCount: 0,
      pageSize: PAGE_SIZE,
      pageCount: 0
    }
    if(this._config.treeable){
      this.pagerData.pageSize = 1000;
    }
    if(this.viewInited){
      setTimeout(()=>{
        this.visibleWidth = this._scrollBody.element.nativeElement.offsetWidth; //不准确
        this.checkHorScroll()
      },0)
      
      let currPath = this.location.path()
      if(currPath.indexOf("?page")<0) //从其他路由切换过来的情况
        this.loadPageDate()
    }
   
  }

  @ViewChild('scorllBody', { read: ViewContainerRef }) _scrollBody: ViewContainerRef;
  @ViewChild('scorllHeader', { read: ViewContainerRef }) _scorllHeader: ViewContainerRef;
  @ViewChild('scrollRight', { read: ViewContainerRef }) _scrollRight: ViewContainerRef;
  //最大可视区域高度
  fullHeight = 0;
  //固定区域右边距离宽度,区别有没有滚动条的情况，没有需要设置为0
  fixedRightOffsetWidth = 9;
  selectedAll = false;
  viewInited = false;
  rows = []
  columns = []
  filters = {}
  queryIn = {}
  sorting = {key:"",value:""}
  fixedLeft = [];
  fixedRight = [];
  scrollHandler;
  resizeHandler;
  //是否出现水平滚动
  scrollHorizontal = true;
  //是否出现垂直滚动
  scrollVertical = true;
  dataReady = false;
  queryParams;
  lastLoadSub:Subscription;
  queryParamsSub:Subscription;
  toggleSub: Subscription;
  visibleWidth = 0;
  pagerData = {
    currentPage: 1,
    recordCount: 0,
    pageSize: PAGE_SIZE,
    pageCount: 0
  }


  datePickerConfig1 = {
    locale: 'zh-CN',
    format:'YYYY-MM-DD'
  }

  datePickerConfig2 = {
    locale: 'zh-CN',
    appendTo:"body",
    format:'YYYY-MM-DD HH:mm'
  }
  ngOnInit() {
    this.queryParamsSub = this.activeRouter.queryParams.subscribe(params=> {
      this.queryParams = params
      this.loadPageDate()
    })

     this.toggleSub = this.sidebarService.onToggle().subscribe((data: { compact: boolean, tag: string }) => {
         setTimeout(()=>{
             this.visibleWidth = this._scrollBody.element.nativeElement.offsetWidth;
             this.onResize();
         },0)
        
      });
  }

  ngAfterViewInit() {
    this.viewInited = true;
    this.visibleWidth = this._scrollBody.element.nativeElement.offsetWidth;
    this.onResize()
    //同步滚动条
    let fixedBodyList = Array.prototype.slice.call(this.el.nativeElement.querySelectorAll(".table-fixed .table-body"))
    this.scrollHandler = this.renderer.listen(this._scrollBody.element.nativeElement, "scroll", (evt) => {
      let scorllHeaderElement = this._scorllHeader.element.nativeElement
      scorllHeaderElement.scrollLeft = evt.target.scrollLeft
      fixedBodyList.forEach((item) => {
        item.scrollTop = evt.target.scrollTop
      })
    })

    this.resizeHandler = this.renderer.listen(window, "resize", (evt) => {
      this.visibleWidth = this._scrollBody.element.nativeElement.offsetWidth;
      this.onResize()
    })

  }

  onResize() {
    var doucumentHeight = document.documentElement.clientHeight
    var visibleHeight = doucumentHeight - 76 - 76 - 63 - 48 - 40 - 64 - 60;
    if(this._config.treeable){
      visibleHeight+=40;
    }
    this.fullHeight = visibleHeight
    this.checkVerScroll()
    this.checkHorScroll()
  }

  refresh() {
    this.loadPageDate()
  }

  doFilter(filterKey,filterVal){
    this.filters[filterKey] = filterVal;
    this.refresh()
  }

  treeNodeSelected(filterItem,e){
     let moduleArr = filterItem.dataSourceOrigin.split(".")
     let apiName = `${moduleArr[0]}.${moduleArr[1]}DataApi`;
     let resource = this.injector.get(apiName).resource
     resource.get({parentId:e.node.data.id}).map((res)=>res.json().result).subscribe((res)=>{
       var idList = _.map(res,(item)=>{
         return item._id;
       })
       this.queryIn[filterItem.key] = idList.join(",");
       this.refresh()
     })
  }


  doSorting(sortabld,sortKey){
    if(!sortabld){
      return;
    }
    this.sorting["key"] = sortKey
    let sortValue = this.sorting["value"];
    if(sortValue==""){
      sortValue = "ascending"
    }
    else if(sortValue=="ascending"){
      sortValue = "descending"
    }
    else{
      sortValue = ""
    }
    this.sorting["value"] = sortValue;
    this.refresh()
  }

  doSearch(event,column){
    column.searchMode = true
    event.stopPropagation();
  }

  doCloseSearch(event,column){
    column.searchMode = false
    event.stopPropagation();
  }

  onSearchInputClick(event){
     event.stopPropagation();
  }

  onSearchChange(event,column){
    this.refresh()
  }

  onDateTimeSearchChange(event,column){
    this.refresh()
  }

  loadPageDate() {
    if(this.lastLoadSub){
      this.lastLoadSub.unsubscribe()
      this.lastLoadSub = null;
    }
    let currentPage = 1;
    if(this.modalMode){
      currentPage = this.pagerData.currentPage
    }
    else if(this.queryParams["page"]){
      currentPage = parseInt(this.queryParams["page"])
    }
    let params = {
      sort:"-_id",
      limit:this.pagerData.pageSize,
      skip:(currentPage - 1) * this.pagerData.pageSize
    }
    if(this._config.treeable){
      params.sort = "lft";
    }
    _.each(this.filters,(value,key)=>{
        if(value!=""){
          params[key] = value;
        }
    })

     _.each(this.queryIn,(value,key)=>{
        if(value!=""){
          params[key+"__in"] = value;
        }
    })


    if(this.sorting.key!=""&&this.sorting.value!=""){
      if(this.sorting.value=="ascending"){
        params.sort = this.sorting.key;
      }
      else{
        params.sort = "-"+this.sorting.key;
      }
    }
     _.each(this.columns,(item)=>{
       if(item.searchable){
         if(item.searchKey){
           if(item.widget=="date" || item.widget=="datetime")
             params[item.field+"__gt"] = item.searchKey;
           else
             params[item.field+"__regex"] = item.searchKey;
         }
       }
     })
    //populateable
    let  populates= _.filter(this.columns,(item)=>{
        return item.populateable
    })
    populates = _.map(populates,(item)=>{
      return item.field
    })
    if(populates.length>0)
      params["populate"] = populates.join(" ")
     //console.log(params)

   this.lastLoadSub = this.resource.get(params).subscribe((data) => {
      let res = data.json()
      let results = res.result;
      this.pagerData.recordCount = res.record_count;
      this.pagerData.pageCount = Math.ceil(this.pagerData.recordCount / this.pagerData.pageSize);
      if(!this.modalMode)
        this.pagerData.currentPage = currentPage;
      _.each(results,(row)=>{
        row.selected = this.initSelectedIds.indexOf(row["_id"])>=0
        _.each(this.columns,(col)=>{
            if(col.get_display){
              row[col.field] = col.get_display(row)
            }
            if(col.widget=='datetime'){
              row[col.field] = formatDate(new Date(row[col.field]),'yyyy-MM-dd hh:mm')
            }else if(col.widget=='date'){
              row[col.field] = formatDate(new Date(row[col.field]),'yyyy-MM-dd')
            }
        })
      })
      this.rows = results
      this.dataReady = true;
      this.checkVerScroll();
      this.dataLoadComplete.emit(res.record_count);
    },(error)=>{
      console.log(error)
    })
  }

  checkVerScroll(){
    this.scrollVertical = this.rows.length*this.rowHeight>this.fullHeight
    this.fixedRightOffsetWidth = this.scrollVertical?9:0;
  }

  checkHorScroll(){
    this.scrollHorizontal = this.getColumnTotalWidth()>this.visibleWidth;
  }

  add() {
    this.router.navigate([this.router.url,"add"]);
  }

  edit(id) {
    let routeMap = parseRouteMap(this.router.url)
    this.router.navigate(["apps/"+routeMap.app+"/"+routeMap.module+"/"+id+"/","edit"],{queryParams: {page: this.pagerData.currentPage}});
  }

  addChild(id) {
    let routeMap = parseRouteMap(this.router.url)
    this.router.navigate(["apps/"+routeMap.app+"/"+routeMap.module+"/","add"],{queryParams: {parentId:id,page: this.pagerData.currentPage}});
  }

  deleteAll() {
    let ids = this.getSelectedIds()
    if (ids.length == 0) {
      this.dialogService.alert("没有选择任何选项")
    }
    else {
      this.dialogService.confirm("确认删除吗?").then((res) => {
        let deleteCount = ids.length;
        _.each(ids, (id) => {
          this.resource.delete(id).subscribe((res) => {
            deleteCount--;
            if (deleteCount <= 0) {
              this.refresh()
            }
          })
        })
        this.toasterService.pop('success', '删除成功');
      }, (reason) => {
        console.log(reason)
      })
    }

  }

  delete(id) {
    this.dialogService.confirm("确认删除吗?").then((res) => {
      this.resource.delete(id).subscribe((res) => {
        this.toasterService.pop('success', '删除成功');
        this.refresh()
      })
    }, (reason) => {
    })

  }
 
 /**
 获取列的总宽度
 **/
  getColumnTotalWidth(){
    let totalWidth = 0
    this.columns.forEach((column) => {
       totalWidth+=column.width
    })
    return totalWidth
  }


  getSelectedIds(){
    var ids = _.filter(this.rows, (item) => { return item.selected }).map((item) => {
      return item._id;
    })
    return ids;
  }

  getSelectedData(){
    return _.filter(this.rows, (item) => { return item.selected })
  }


  onPageChange(newPage) {
  
    if(this.modalMode){
        this.pagerData.currentPage = newPage
      this.loadPageDate()
    }
    else{
       let routeMap = parseRouteMap(this.router.url)
       this.router.navigate(["apps/"+routeMap.app+"/"+routeMap.module+"/"],{queryParams:{page: newPage}})
    }
  
    
  }

  onSelectedAllChange(event) {
    this.rows.forEach((row) => {
      row.selected = event.target.checked;
    })
    this.onSelectedChange.emit(this.getSelectedData())
  }

  onSelectedSingleChange(event){
    this.onSelectedChange.emit(this.getSelectedData())
  }

  ngDestroy() {

    if (this.scrollHandler) {
      this.scrollHandler()
      this.scrollHandler = null;
    }

    if (this.resizeHandler) {
      this.resizeHandler()
      this.resizeHandler = null;
    }

    if(this.lastLoadSub){
      this.lastLoadSub.unsubscribe()
      this.lastLoadSub = null;
    }

    if(this.queryParamsSub){
      this.queryParamsSub.unsubscribe()
      this.queryParamsSub = null
    }


  }



}
