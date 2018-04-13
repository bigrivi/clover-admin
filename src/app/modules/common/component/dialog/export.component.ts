  import { Component,Input,ViewChild,Injector,Inject,OnInit } from '@angular/core';
  import {AppService} from '../../../common/services/app.service'
  import {TableViewComponent} from "../table-view/table-view.component"
  import { NzModalSubject } from 'ng-zorro-antd';
import * as _ from 'lodash';
import {environment} from "../../../../../environments/environment"
import {NbAuthSimpleToken,NbTokenService} from '../../../../modules/auth/services/token.service'


  @Component({
    selector: 'ngx-dialog-export',
    template: `
     <div class="modal-body">
       <fieldset>
              <legend (click)="toggleFieldsShow()">
              <i class='fa fa-chevron-down' *ngIf="fieldsExpand"></i>
              <i class='fa fa-chevron-right' *ngIf="!fieldsExpand"></i>
              字段选择
              </legend>
              <div class='control-groups' *ngIf="fieldsExpand">
                <div class='control-group'>
                  <label class='control-label' data-original-title='Click to reverse selection' (click)='fanxuan()' rel='tooltip'>字段列表</label>
                   <div class='controls'>
                     <label nz-checkbox *ngFor="let fieldItem of fields" [(ngModel)]="fieldItem.checked">
                      <span>{{fieldItem.label | translate}}</span>
                    </label>
                    </div>
                </div>
              </div>
          </fieldset>
          <fieldset>
            <legend (click)="toggleOptionShow()">
              <i class='fa fa-chevron-down' *ngIf="optionExpand"></i>
              <i class='fa fa-chevron-right' *ngIf="!optionExpand"></i>
              csv/Excel选项
              </legend>
        <div class='control-group' *ngIf="optionExpand">
        <label class='control-label' for='csv_options_encoding_to'>编码</label>
        <div class='controls'>
        <nz-select  style="width: 150px;" [(ngModel)]="encodingTo">
            <nz-option nzLabel="" nzValue=""></nz-option>
            <nz-option nzLabel="UTF-8" nzValue="UTF-8"></nz-option>
            <nz-option nzLabel="UTF-16LE" nzValue="UTF-16LE"></nz-option>
            <nz-option nzLabel="UTF-16BE" nzValue="UTF-16BE"></nz-option>
            <nz-option nzLabel="UTF-32LE" nzValue="UTF-32LE"></nz-option>
            <nz-option nzLabel="UTF-32BE" nzValue="UTF-32BE"></nz-option>
            <nz-option nzLabel="UTF-7" nzValue="UTF-7"></nz-option>
            <nz-option nzLabel="ISO-8859-1" nzValue="ISO-8859-1"></nz-option>
            <nz-option nzLabel="ISO-8859-15" nzValue="ISO-8859-15"></nz-option>
            <nz-option nzLabel="IBM-850" nzValue="IBM-850"></nz-option>
            <nz-option nzLabel="MacRoman" nzValue="MacRoman"></nz-option>
            <nz-option nzLabel="Windows-1252" nzValue="Windows-1252"></nz-option>
            <nz-option nzLabel="ISO-8859-3" nzValue="ISO-8859-3"></nz-option>
            <nz-option nzLabel="IBM-852" nzValue="IBM-852"></nz-option>
            <nz-option nzLabel="ISO-8859-2" nzValue="ISO-8859-2"></nz-option>
            <nz-option nzLabel="MacCE" nzValue="MacCE"></nz-option>
            <nz-option nzLabel="Windows-1250" nzValue="Windows-1250"></nz-option>
            <nz-option nzLabel="IBM-855" nzValue="IBM-855"></nz-option>
            <nz-option nzLabel="ISO-8859-5" nzValue="ISO-8859-5"></nz-option>
            <nz-option nzLabel="ISO-IR-111" nzValue="ISO-IR-111"></nz-option>
            <nz-option nzLabel="KOI8-R" nzValue="KOI8-R"></nz-option>
            <nz-option nzLabel="MacCyrillic" nzValue="MacCyrillic"></nz-option>
            <nz-option nzLabel="Windows-1251" nzValue="Windows-1251"></nz-option>
            <nz-option nzLabel="CP-866" nzValue="CP-866"></nz-option>
            <nz-option nzLabel="KOI-U" nzValue="KOI-U"></nz-option>
            <nz-option nzLabel="MacUkranian" nzValue="MacUkranian"></nz-option>
            <nz-option nzLabel="GB2312" nzValue="GB2312"></nz-option>
            <nz-option nzLabel="GBK" nzValue="GBK"></nz-option>
            <nz-option nzLabel="GB18030" nzValue="GB18030"></nz-option>
            <nz-option nzLabel="HZ" nzValue="HZ"></nz-option>
            <nz-option nzLabel="ISO-2022-CN" nzValue="ISO-2022-CN"></nz-option>
            <nz-option nzLabel="Big5" nzValue="Big5"></nz-option>
            <nz-option nzLabel="Big5-HKSCS" nzValue="Big5-HKSCS"></nz-option>
            <nz-option nzLabel="EUC-TW" nzValue="EUC-TW"></nz-option>
            <nz-option nzLabel="EUC-JP" nzValue="EUC-JP"></nz-option>
            <nz-option nzLabel="ISO-2022-JP" nzValue="ISO-2022-JP"></nz-option>
            <nz-option nzLabel="Shift_JIS" nzValue="Shift_JIS"></nz-option>
            <nz-option nzLabel="EUC-KR" nzValue="EUC-KR"></nz-option>
            <nz-option nzLabel="UHC" nzValue="UHC"></nz-option>
            <nz-option nzLabel="JOHAB" nzValue="JOHAB"></nz-option>
            <nz-option nzLabel="ISO-2022-KR" nzValue="ISO-2022-KR"></nz-option>
        </nz-select>

        <p class='help-block'>选择编码 默认为(UTF-8)</p>
        </div>
        <label class='control-label' for='csv_options_skip_header'>没有表格头</label>
        <div class='controls'>
          <label nz-checkbox [(ngModel)]="skipHeader">
          <span></span>
        </label>
        <p class='help-block'>不输出表格头(没有字段描述)</p>
        </div>
        <label class='control-label' for='csv_options_generator_col_sep'>列分隔符</label>
        <div class='controls'>
            <nz-select [nzPlaceHolder]="''"  style="width: 150px;" [(ngModel)]="colSep">
                <nz-option nzLabel="&lt;comma&gt; ','" nzValue=","></nz-option>
                <nz-option nzLabel="&lt;semicolon&gt; " nzValue=";"></nz-option>
                <nz-option nzLabel="&lt;tabs&gt;" nzValue="'  '"></nz-option>
            </nz-select>

          <p class='help-block'>默认 (',')</p>
        </div>
        </div>
        </fieldset>
         <fieldset>
              <legend (click)="toggleSortShow()">
              <i class='fa fa-chevron-down' *ngIf="fieldsExpand"></i>
              <i class='fa fa-chevron-right' *ngIf="!fieldsExpand"></i>
              排序
              </legend>
              <div class='control-group' *ngIf="sortExpand">
                <label class='control-label' data-original-title='Click to reverse selection' rel='tooltip'>
                排序字段</label>
                 <div class='controls'>
                  <nz-select style="width: 150px;" [(ngModel)]="sortField">
                  <nz-option
                    *ngFor="let fieldItem of fields"
                    [nzLabel]="fieldItem.label"
                    [nzValue]="fieldItem.field">
                  </nz-option>
                </nz-select>
                  <p class='help-block'>排序字段(默认为id)</p>
                  </div>
                   <label class='control-label'>排序</label>
                  <div class='controls'>
                       <nz-select  style="width: 150px;" [(ngModel)]="sort">
                            <nz-option nzLabel="降序" nzValue="desc"></nz-option>
                            <nz-option nzLabel="升序" nzValue="asc"></nz-option>
                        </nz-select>

                        <p class='help-block'>默认 (降序)</p>
                    </div>
              </div>

          </fieldset>
      </div>
      <div class="customize-footer">
          <button nz-button [nzType]="'primary'" (click)="export('csv')">导出为Csv</button>
             <button nz-button [nzType]="'primary'" (click)="export('excel')">导出为Excel</button>
             <button nz-button [nzType]="'primary'" (click)="export('json')">导出为Json</button>
             <button nz-button  [nzType]="'primary'" (click)="export('xml')">导出为Xml</button>
          <button nz-button [nzType]="'default'" [nzSize]="'large'" (click)="handleCancel($event)">
            取消
          </button>
        </div>
    `,
     styles  : [
        `
        :host ::ng-deep.modal-body {
           max-height:500px;
           overflow:auto;
        }
        :host ::ng-deep .customize-footer {
          border-top: 1px solid #e9e9e9;
          padding: 10px 18px 0 10px;
          text-align: right;
          border-radius: 0 0 0px 0px;
          margin: 15px -16px -5px -16px;
        }
      `
    ]
  })
  export class ExportDialogComponent implements OnInit {
    @Input() module= "";
    @Input() app= "";
    @Input() params= {};
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
     token:NbAuthSimpleToken;

    constructor(
      private subject:NzModalSubject,
      public appService:AppService,
      @Inject("DataApiService") private dataApiService,
      public tokenService:NbTokenService,
      ) {
        this.tokenService.tokenChange().subscribe((token)=>{
              this.token = token
          })

    }

    ngOnInit() {
       let apiName = `${this.app}.${this.module}DataApi`;
        this.config = this.dataApiService.get(apiName).config
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


    handleCancel(e) {
      this.subject.destroy('onCancel');
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
        fieldNames:encodeURI(fieldNames.join(",")),
        resource:this.config.resource,
        app:this.config.app,
        skipHeader:this.skipHeader,
        encodingTo:this.encodingTo,
        colSep:this.colSep,
        sortField:this.sortField,
        sort:this.sort,
        populates:populates.join(","),
        format:format,
        accesstoken: this.token.getValue()
      }

      let newFormData = Object.assign(formData,this.params)
      let apiName = `${this.config.app}.${this.config.module}DataApi`;
      let resource = this.dataApiService.get(apiName).resource
      var url = environment.API_ROOT+resource.resourceApi+"/export?"+resource.formEncode(newFormData);

      var anchorElement = document.createElement('a');
      anchorElement.href = url;
      anchorElement.target="_parent"
      document.body.appendChild(anchorElement);
      anchorElement.click();
      document.body.removeChild(anchorElement);

    }




  }