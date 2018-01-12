import { Component, Injector,OnInit,Input,HostBinding } from '@angular/core';
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder,Validators,AbstractControl } from '@angular/forms';
import {Observable} from 'rxjs'
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import {AppService} from '../../services/app.service'
import {ChosenOption, ChosenOptionGroup} from "../chosen/chosen-commons";
import { Router, NavigationEnd } from '@angular/router';
import * as _ from 'lodash';
import {formatDate} from '../../utils/date.utils'
import {parseRouteMap} from '../../utils/route.utils'


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

    this._fields = Object.keys(this._config["fields"]);
     this._fields = this._fields.map((field)=>{
      let src = this._config["fields"][field]
      let clone = Object.assign({},src)
      clone.field = field
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


    this._fields.forEach(control => {
          this.form.addControl(control.field, this.createControl(control))
    });
    if(isEditMode){
       this.loadData()
    }

  }

  constructor(private fb: FormBuilder,
    private http:Http,
    public route: ActivatedRoute,
    public router: Router,
    public injector: Injector,
    public activeRouter: ActivatedRoute,
    public toasterService: ToasterService) {
    this._params["id"] = this.route.snapshot.params["id"]

  }

  loadData(){
    let  populates= _.filter(this._fields,(item)=>{
        return item.populateable
    })
    populates = _.map(populates,(item)=>{
      return item.field
    })
    populates = []
    let requestUrl = this._config.resource+"/"+this._params["id"]
    if(populates.length>0)
      requestUrl+= "?populate="+populates.join(" ")
    let apiName = `${this._config.app}.${this._config.module}DataApi`;
    let resource = this.injector.get(apiName).resource
    resource.get({populate:populates.join(" ")},"/"+this._params["id"]).subscribe((res)=>{
          let data = res.json()
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
      let control:AbstractControl = this.form.controls[controlKey]
      control.markAsDirty()
    })
    if(!this.form.valid){
      this.toasterService.pop('error', '请正确填写数据');
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
    if(fieldData.widget=="text" || fieldData.widget=="password"|| fieldData.widget=="number"|| fieldData.widget=="textarea"){
      msg = "请输入"+fieldData.label;
    }else if(fieldData.widget=="radio"){
      msg = "请选择"+fieldData.label;
    }else if(fieldData.widget=="uploader"){
      msg = "请选择"+fieldData.label+"文件";
    }else if(fieldData.widget=="date"){
      msg = "请选择日期";
    }else if(fieldData.widget=="datetime"){
      msg = "请选择日期时间";
    }else if(fieldData.widget=="time"){
      msg = "请选择时间";
    }else if(fieldData.widget=="checkbox" || fieldData.widget=="itemselect"){
      msg = "请至少选项一项"+fieldData.label;
    }else if(fieldData.widget=="select"){
      if(fieldData.multiple)
        msg = "请至少选项一项"+fieldData.label;
      else
        msg = "请选择"+fieldData.label;
    }
    return msg;
  }


}
