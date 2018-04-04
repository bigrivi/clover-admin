import { Component,Inject,Injector, OnInit,EventEmitter, ViewChild, ViewContainerRef, Renderer2, ElementRef, Input,Output,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Location } from '@angular/common';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { DialogService } from "../dialog/dialog.service"
import * as _ from 'lodash';
import {NzNotificationService,NzMessageService} from 'ng-zorro-antd';
import {Subscription} from 'rxjs'
import {AppService} from '../../services/app.service'
import {formatDate} from '../../utils/date.utils'
import {parseRouteMap} from '../../utils/route.utils'
import {UserService} from '../../../../@core/data/users.service'


const PAGE_SIZE = 10;
@Component({
  selector: 'table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.less'],
  host: {
    class: 'table-view'
  }
})
export class TableViewComponent implements OnInit {
  selectedAll = false;
  viewInited = false;
  rows = []
  columns = []
  filters = {}
  loading = false
  queryIn = {}
  sorting = {key:"",value:""}
  resizeHandler;
  dataReady = false;
  queryParams;
  lastLoadSub:Subscription;
  queryParamsSub:Subscription;
  toggleSub: Subscription;
  visibleWidth = 0;
  searchableFields:any[] = [];
  searchKeywords:string = ""
  selectAllSearchField = true;
  pagerData = {
    currentPage: 1,
    recordCount: 0,
    pageSize: PAGE_SIZE,
    pageCount: 0
  }


  constructor(
   public renderer: Renderer2,
   public el: ElementRef,
   public userService:UserService,
   public location: Location,
   public http: Http,
   public messageService: NzMessageService,
   public router: Router,
   public activeRouter: ActivatedRoute,
   public appService:AppService,
   public ref: ChangeDetectorRef,
   @Inject("DataApiService") private dataApiService,
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
  set config(val:any) {
    this._config = _.cloneDeep(val);
    console.log(this._config)
    let apiName = `${this._config.app}.${this._config.module}DataApi`;
    this.resource = this.dataApiService.get(apiName).resource
    let defaultOptions = {
      listHide:[],
      modalListShow:[],
      actionable:true,
      selecteable:true,
      addable:false,
      searchable:true,
      exportable:true,
      filters:[],
      treeable:false,
      extActions:[]
    }
    this._config = Object.assign(defaultOptions,this._config)
    this._config.actions =[]
    this.filters = {}
    this.queryIn = {}
    this.rows = [];
    this.dataReady = false;
    this.selectedAll = false;
    this.sorting = {key:"",value:""}
    this.loading = false
    this.searchKeywords = ""
    this.selectAllSearchField = true;
    let defaultAction =  [
      {
        label:"edit",
        action:"edit",
        authNode:`${this._config.app}.${this._config.module}.put`,
        link:""
      },
       {
        label:"delete",
        action:"delete",
        authNode:`${this._config.app}.${this._config.module}.delete`,
        link:""
      }
    ];
    _.each(defaultAction,(action)=>{
      if(this.userService.checkNodeIsAuth(action.authNode))
        this._config.actions.push(action)
    })
    _.each(this._config.extActions,(action)=>{
      if(this.userService.checkNodeIsAuth(action.authNode))
        this._config.actions.push(action)
    })



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
    this.searchableFields = this.columns.filter((fieldCfg)=>{
        return  fieldCfg.widget=="text" || fieldCfg.widget=="textarea"
    })

    if (this._config.selecteable && !this._config.treeable) {
      this.columns.unshift({
        field: "selectedId",
        label: "",
        width: 50,
      })
    }

    _.forEach(this.columns,(item)=>{
       if(item.searchable && item.dataSource){
         let dataSource = item.dataSource
         item.dataSourceOrigin = dataSource
           this.filters[item.key] = "";
           if(!_.isArray(dataSource)){
             item.dataSource = []
             let moduleArr = dataSource.split(".")
             let apiName = `${moduleArr[0]}.${moduleArr[1]}DataApi`;
             let dataApi = this.dataApiService.get(apiName)
             let resource = dataApi.resource
             let moduleConfig = dataApi.config
             resource.get({},item.tree?"/getTreeNode":"").map((res)=>res.json().data)
             .subscribe((res)=>{
                 if(item.tree){
                   item.dataSource = res;
                 }else{
                   item.dataSource = _.map(res,(data)=>{
                       let label = data[moduleConfig.labelField||"name"];
                       let value = data[moduleConfig.valueField||"_id"];
                       return {
                         label:label,
                         value:value
                       }

                   })
                 }

             })
         }
       }
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
      let currPath = this.location.path()
      if(currPath.indexOf("?page")<0) //从其他路由切换过来的情况
        this.loadPageDate()
    }

  }

  // @ViewChild('scorllBody', { read: ViewContainerRef }) _scrollBody: ViewContainerRef;
  // @ViewChild('scorllHeader', { read: ViewContainerRef }) _scorllHeader: ViewContainerRef;
  // @ViewChild('scrollRight', { read: ViewContainerRef }) _scrollRight: ViewContainerRef;

  ngOnInit() {
    this.queryParamsSub = this.activeRouter.queryParams.subscribe(params=> {
      this.queryParams = params
      this.loadPageDate()
    })
  }

  ngAfterViewInit() {
    this.viewInited = true;
    // this.visibleWidth = this._scrollBody.element.nativeElement.offsetWidth;
    this.onResize()
    //同步滚动条
    // let fixedBodyList = Array.prototype.slice.call(this.el.nativeElement.querySelectorAll(".table-fixed .table-body"))
    // this.scrollHandler = this.renderer.listen(this._scrollBody.element.nativeElement, "scroll", (evt) => {
    //   let scorllHeaderElement = this._scorllHeader.element.nativeElement
    //   scorllHeaderElement.scrollLeft = evt.target.scrollLeft
    //   fixedBodyList.forEach((item) => {
    //     item.scrollTop = evt.target.scrollTop
    //   })
    // })

    // this.resizeHandler = this.renderer.listen(window, "resize", (evt) => {
    //   this.visibleWidth = this._scrollBody.element.nativeElement.offsetWidth;
    //   this.onResize()
    // })

  }

  onResize() {

  }

  refresh() {
    this.loadPageDate()
  }

  doFilter(filterKey,filterVal){
    this.filters[filterKey] = filterVal;
    this.refresh()
  }

  doQueryIn(filterColumn){
    let dataSource = filterColumn.dataSource
    let selectValues = _.filter(dataSource,(item)=>{
      return item.selected
    })
    selectValues = _.map(selectValues,(item)=>{
      return item.value
    })
     let moduleArr = filterColumn.dataSourceOrigin.split(".")
     let apiName = `${moduleArr[0]}.${moduleArr[1]}DataApi`;
     let resource = this.dataApiService.get(apiName).resource
     this.queryIn[filterColumn.field] = selectValues.join(",");
     this.refresh()
  }

  resetQueryIn(filterColumn){
    let dataSource = filterColumn.dataSource
    _.each(dataSource,(item)=>{
      item.selected = false
    })
    this.doQueryIn(filterColumn)
  }




  doSorting(sortKey,sortValue){
    this.sorting["key"] = sortKey
    if(sortValue==null){
      this.sorting["value"] = "";
      this.sorting["key"] = ""
    }
    else
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

  onSearchChange(event){
    this.refresh()
  }

  onSelectAllSearchFieldChange(event){
    if(this.selectAllSearchField){
        this.searchableFields.forEach((item)=>{
            item.selected = false
        })
    }
  }

  onSelectSearchFieldChange(){
     let selectCount = 0
     this.searchableFields.forEach((item)=>{
          if(item.selected){
            selectCount++;
            this.selectAllSearchField = false
          }
      })
     if(selectCount==0){
       this.selectAllSearchField = true
     }
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

     let routeMap = this.activeRouter.snapshot.params
     if(routeMap["submodule"]){
       let moduleConfig = this.dataApiService.get(`${routeMap.app}.${routeMap["module"]}DataApi`).config
       let forign_key = moduleConfig.resource+"_id"
       params[forign_key+"__equals"] = routeMap["id"]
     }


    if(this.sorting.key!=""&&this.sorting.value!=""){
      if(this.sorting.value=="ascend"){
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
    if(this.searchKeywords!=""){
      if(this.selectAllSearchField){
          let orFields = this.searchableFields.map((item)=>{
            return item.field
          })
          params["searchOrFields"] = orFields.join(" ");
          params["searchKeyword"] = this.searchKeywords;
      }
      else{
           let orFields = this.searchableFields.filter((item)=>{
            return item.selected
          }).map((item)=>{
            return item.field
          })
          params["searchOrFields"] = orFields.join(" ");
          params["searchKeyword"] = this.searchKeywords;
      }
    }

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
   this.loading = true
   this.lastLoadSub = this.resource.get(params).subscribe((data) => {
      let res = data.json().data
      let results = res.data;
      this.loading = false
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
      this.dataLoadComplete.emit(res.record_count);
    },(error)=>{
      console.log(error)
    })
  }



  edit(id) {
    let routeMap = this.activeRouter.snapshot.params;
    if(routeMap["submodule"])
      this.router.navigate(["apps/"+routeMap.app+"/"+routeMap.module+"/"+routeMap["id"]+"/"+routeMap["submodule"]+"/"+id,"edit"],{queryParams: {page: this.pagerData.currentPage}});
    else
      this.router.navigate(["apps/"+routeMap.app+"/"+routeMap.module+"/"+id+"/","edit"],{queryParams: {page: this.pagerData.currentPage}});

  }

  addChild(id) {
    let routeMap = parseRouteMap(this.router.url)
    this.router.navigate(["apps/"+routeMap.app+"/"+routeMap.module+"/","add"],{queryParams: {parentId:id,page: this.pagerData.currentPage}});
  }

  doAction(action,id){
    if(action=="edit"){
      this.edit(id)
    }
    else if(action=="delete"){
      this.delete(id)
    }
    else if(action=="addChild"){
      this.addChild(id)
    }
    else{
      let routeMap = parseRouteMap(this.router.url)
      this.router.navigate(["apps/"+routeMap.app+"/"+routeMap.module+"/"+id+"/",action],{queryParams: {page: this.pagerData.currentPage}});
    }
  }



  delete(id) {
    this.dialogService.confirm("确认删除吗?").then((res) => {
      this.resource.delete(id).subscribe((res) => {
        this.messageService.success('删除成功');
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
       let routeMap = this.activeRouter.snapshot.params
       if(routeMap["submodule"])
         this.router.navigate(["apps/"+routeMap.app+"/"+routeMap.module+"/"+routeMap["id"]+"/"+routeMap["submodule"]],{queryParams:{page: newPage}})
       else
         this.router.navigate(["apps/"+routeMap.app+"/"+routeMap.module+"/"],{queryParams:{page: newPage}})
    }


  }

  onSelectedAllChange(checked) {
    this.rows.forEach((row) => {
      row.selected = checked;
    })
    this.onSelectedChange.emit(this.getSelectedData())
  }

  onSelectedSingleChange(event){
    this.onSelectedChange.emit(this.getSelectedData())
  }

  ngDestroy() {

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
