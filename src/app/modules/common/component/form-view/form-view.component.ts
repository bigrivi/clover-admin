import { Component, Injector,OnInit,Input,HostBinding } from '@angular/core';
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder,Validators,AbstractControl } from '@angular/forms';
import {Observable} from 'rxjs'
import {AppService} from '../../services/app.service'
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import {formatDate} from '../../utils/date.utils'
import {parseRouteMap} from '../../utils/route.utils'
import {TranslateService} from '../../../../@core/utils/translate.service'

import {NzNotificationService,NzMessageService} from 'ng-zorro-antd';


@Component({
  selector: 'form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss'],
  host: {
    class: 'form-view'
  }
})
export class FormViewComponent {

  form: FormGroup;
 _config;
 _params = {}
 _fields = []
 _fieldsByKey = {}
 _subscriptions:Subscription[] = [];
  @Input()
  set params(val) {
    this._params = val;
  }

  @Input()
  set config(val) {
    let isEditMode = this._params["id"]?true:false;
    if(!this.form)
      this.form = this.fb.group({});
  	this._config = _.cloneDeep(val);
    if(this.form){
     this._fields = []
     let controls = Object.keys(this.form.controls)
      controls.forEach((controlKey)=>{
       this.form.removeControl(controlKey)
      })
    }

    _.each(this._config["fields"],(value,key)=>{
      if(value.chain){
          _.each(value.chain,(chainFileds,chainValue)=>{
              // console.log(chainFileds,chainValue)
              let fieldsArr = chainFileds.split(",")
              if(fieldsArr.length>0){
                  _.each(fieldsArr,(field)=>{
                      this._config["fields"][field].visible = false
                  })
              }
          })
      }
    })

    this._fields = Object.keys(this._config["fields"]);
     this._fields = this._fields.map((field)=>{
      let src = this._config["fields"][field]
      let clone = Object.assign({},src)
      clone.field = field
      if(src.visible == false)
        clone.visible = false
      else
        clone.visible = true
      if(src.chain)
        clone.chain = src.chain
      clone.value = src.value || ""
      clone.errMsg = clone.errMsg || this.getDefaultErrMsg(clone)
      return clone;
    })
    this._fields = _.filter(this._fields,(item)=>{
      if(isEditMode){
        if(typeof(item.editable)!="undefined")
        return item.editable
      }else{
        if(typeof(item.addable)!="undefined")
        return item.addable
      }
      return true;
    })

    this._fieldsByKey = {}
    this._fields.forEach(config => {
          this._fieldsByKey[config.field] = config
          this.form.addControl(config.field, this.createControl(config))
    });
    if(isEditMode){
       this.loadData()
    }


    //初始化联动效果
    this._subscriptions = []
    this._fields.forEach(control => {
          if(control.chain){
            let subscription = this.form.controls[control.field].valueChanges.subscribe((newVal)=>{
                   console.log("change"+newVal)
                   _.each(control.chain,(chainFileds,chainValue)=>{
                        let fieldsArr = chainFileds.split(",")
                        if(chainValue == newVal){
                            if(fieldsArr.length>0){
                                _.each(fieldsArr,(field)=>{
                                     this._fieldsByKey[field].visible = true
                                     let validation = this._fieldsByKey[field].require?[Validators.required]:null;
                                     this.form.controls[field].setValidators(validation)
                                })
                             }
                        }
                        else{
                            if(fieldsArr.length>0){
                                _.each(fieldsArr,(field)=>{
                                     this._fieldsByKey[field].visible = false
                                     this.form.controls[field].setValidators(null)
                                })
                             }
                        }

                    })
              })

              this._subscriptions.push(subscription)
          }
    });

  }

  constructor(private fb: FormBuilder,
    private http:Http,
    public route: ActivatedRoute,
    public router: Router,
    public translateService:TranslateService,
    public messageService: NzMessageService,
    public injector: Injector,
    public activeRouter: ActivatedRoute) {
    this._params["id"] = this.route.snapshot.params["id"]

  }

  loadData(){
    let  populates= _.filter(this._fields,(item)=>{
        return item.populateable
    })
    populates = _.map(populates,(item)=>{
      return item.field
    })
    let requestUrl = this._config.resource+"/"+this._params["id"]
    if(populates.length>0)
      requestUrl+= "?populate="+populates.join(" ")
    let apiName = `${this._config.app}.${this._config.module}DataApi`;
    let resource = this.injector.get(apiName).resource
    resource.get({populate:populates.join(" ")},"/"+this._params["id"]).subscribe((res)=>{
          let data = res.json().data
          let controls = Object.keys(this.form.controls)
           controls.forEach((controlKey)=>{
              let control:AbstractControl = this.form.controls[controlKey]
              let value = data[controlKey]
              if(value){
                let widget = this._config["fields"][controlKey].widget
                if(widget=="datetime"){
                  value = formatDate(new Date(value),"yyyy-MM-dd hh:mm")
                }
                control.setValue(value, {emitEvent: true})
              }
            })
      })
  }

  validata(){
    let controls = Object.keys(this.form.controls)
    controls.forEach((controlKey)=>{
      if(this._fieldsByKey[controlKey].visible){
        let control:AbstractControl = this.form.controls[controlKey]
        control.markAsDirty()
      }

    })
    if(!this.form.valid){
      this.messageService.error('请正确填写数据');
      return false
    }
    return true;
  }

  createControl(config) {
    const { disabled, value } = config;
    let validation = config.require?[Validators.required]:null;
    return this.fb.control({ disabled, value }, validation);
  }

  getDefaultErrMsg(fieldData){
    var msg = "";
    let label = this.translateService.instant(fieldData.label)
    if(fieldData.widget=="text" || fieldData.widget=="password"|| fieldData.widget=="number"|| fieldData.widget=="textarea"){
      msg = "请输入"+label;
    }else if(fieldData.widget=="radio"){
      msg = "请选择"+label;
    }else if(fieldData.widget=="uploader"){
      msg = "请选择"+label+"文件";
    }else if(fieldData.widget=="date"){
      msg = "请选择日期";
    }else if(fieldData.widget=="datetime"){
      msg = "请选择日期时间";
    }else if(fieldData.widget=="time"){
      msg = "请选择时间";
    }else if(fieldData.widget=="checkbox"){
      msg = "请至少选项一项"+label;
    }else if(fieldData.widget=="select" || fieldData.widget=="itemselect" || fieldData.widget=="select3"){
      if(fieldData.multiple)
        msg = "请至少选项一项"+label;
      else
        msg = "请选择"+label;
    }
    return msg;
  }

  ngOnDestroy(){
    this._subscriptions.forEach((item)=>{
      item.unsubscribe()
    })
  }


}
