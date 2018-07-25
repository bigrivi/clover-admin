import { Component, Inject, OnInit, Input, HostBinding } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs'
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
// import { formatDate } from '../../utils/date.utils'
import { TranslateService } from '../../@core/utils/translate.service'

import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';


@Component({
    selector: 'form-view',
    templateUrl: './form-view.component.html',
    styleUrls: ['./form-view.component.less'],
    host: {
        class: 'form-view'
    }
})
export class FormViewComponent {

    form: FormGroup;
    _config;
    _fields = []
    _groups = []
    _groups1 = []
    _fieldsByKey = {}
    _subscriptions: Subscription[] = [];
    loading = true;

    @Input() params;


    @Input()
    set config(val) {
        //let lastPath = this.route.snapshot.url[this.route.snapshot.url.length-1].path
        let isEditMode = val["id"] && val["id"] != "";
        if (!this.form)
            this.form = this.fb.group({});
        this._config = _.cloneDeep(val);
        let groupNames = this._config.group ? this._config.group : ["基本信息"];
        let groups = []
        groupNames.forEach((item) => {
            groups.push({ name: item, fields: [] })
        })
        if (this.form) {
            this._fields = []
            let controls = Object.keys(this.form.controls)
            controls.forEach((controlKey) => {
                this.form.removeControl(controlKey)
            })
        }

        _.each(this._config["fields"], (value, key) => {
            if (value.chain) {
                _.each(value.chain, (chainFileds, chainValue) => {
                    // console.log(chainFileds,chainValue)
                    let fieldsArr = chainFileds.split(",")
                    if (fieldsArr.length > 0) {
                        _.each(fieldsArr, (field) => {
                            this._config["fields"][field].visible = false
                        })
                    }
                })
            }
        })

        this._fields = Object.keys(this._config["fields"]);
        this._fields = this._fields.map((field) => {
            let src = this._config["fields"][field]
            let clone = Object.assign({}, src)
            clone.field = field
            clone.formWidth = !_.isUndefined(src.formWidth) ? clone.formWidth : "fullRow";
            if (src.visible == false)
                clone.visible = false
            else
                clone.visible = true
            if (src.chain)
                clone.chain = src.chain
            clone.value = src.value || ""
            clone.errMsg = clone.errMsg || this.getDefaultErrMsg(clone)
            return clone;
        })
        this._fields = _.filter(this._fields, (item) => {
            if (isEditMode) {
                if (typeof (item.editable) != "undefined")
                    return item.editable
            } else {
                if (typeof (item.addable) != "undefined")
                    return item.addable
            }
            return true;
        })

        this._fieldsByKey = {}
        this._fields.forEach(config => {
            let groupIndex = (Number(config.group) - 1) || 0
            groups[groupIndex].fields.push(config)
            this._fieldsByKey[config.field] = config
            this.form.addControl(config.field, this.createControl(config))
        });
        // if (isEditMode) {
        //     this.loadData()
        // }

        groups.forEach((group) => {
            let fields = group.fields;
            group.rows = []
            let index = 0
            fields.forEach((field) => {
                let prevRowIndex = group.rows.length - 1
                if (index == 0 || prevRowIndex < 0) {
                    group.rows.push([field])
                }
                else if (index == 1) {
                    group.rows[prevRowIndex].push(field)
                }
                if (index == 1 || field.formWidth == "fullRow" || field.formWidth == "halfWidth_") {
                    index = -1
                }
                index++;
            })
        })
        this._groups1 = groups;
        // console.log(this._groups)
        //初始化联动效果
        this._subscriptions = []
        this._fields.forEach(control => {
            if (control.chain) {
                let subscription = this.form.controls[control.field].valueChanges.subscribe((newVal) => {
                    console.log("change" + newVal)
                    _.each(control.chain, (chainFileds, chainValue) => {
                        let fieldsArr = chainFileds.split(",")
                        if (chainValue == newVal) {
                            if (fieldsArr.length > 0) {
                                _.each(fieldsArr, (field) => {
                                    this._fieldsByKey[field].visible = true
                                    let validation = this._fieldsByKey[field].require ? [Validators.required] : null;
                                    this.form.controls[field].setValidators(validation)
                                })
                            }
                        }
                        else {
                            if (fieldsArr.length > 0) {
                                _.each(fieldsArr, (field) => {
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
        private http: Http,
        public translateService: TranslateService,
        @Inject("DataApiService") private dataApiService,
        public messageService: NzMessageService) {

    }

    ngAfterViewInit(){
        setTimeout(()=>{
            this._groups = this._groups1;
            this.loading = false;
            let isEditMode = this._config["id"] && this._config["id"] != "";
            if(isEditMode){
                this.loadData()
            }
        },0)
       
    }

    loadData() {
        let populates = _.filter(this._fields, (item) => {
            return item.populateable
        })
        populates = _.map(populates, (item) => {
            return item.field
        })
        let requestUrl = this._config.resource + "/" + this._config["id"]
        if (populates.length > 0)
            requestUrl += "?populate=" + populates.join(" ")
        let apiName = `${this._config.app}.${this._config.module}DataApi`;
        let resource = this.dataApiService.get(apiName).resource
        let id = this._config["id"];
        resource.get({ populate: populates.join(" ") }, "/" + id).subscribe((res) => {
            let data = res.json().data
            let controls = Object.keys(this.form.controls)
            controls.forEach((controlKey) => {
                let control: AbstractControl = this.form.controls[controlKey]
                let value = data[controlKey]
                if (value) {
                    let widget = this._config["fields"][controlKey].widget
                    if (widget == "datetime") {
                        //value = formatDate(new Date(value), "yyyy-MM-dd hh:mm")
                    }
                    control.setValue(value, { emitEvent: true })
                }
            })
        })
    }

    validata() {
        let controls = Object.keys(this.form.controls)
        controls.forEach((controlKey) => {
            if (this._fieldsByKey[controlKey].visible) {
                let control: AbstractControl = this.form.controls[controlKey]
                control.markAsDirty()
            }

        })
        if (!this.form.valid) {
            _.each(this._fields, (field) => {
                var formControl = this.form.controls[field.field]
                if (formControl.errors && formControl.errors["required"]) {
                    console.log(formControl)
                    this.messageService.error(field.errMsg);
                    return false;
                }
            })
            return false
        }
        return true;
    }

    createControl(config) {
        const { disabled, value } = config;
        let validation = config.require ? [Validators.required] : null;
        return this.fb.control({ disabled, value }, validation);
    }

    getDefaultErrMsg(fieldData) {
        var msg = "";
        let label = this.translateService.instant(fieldData.label)
        if (fieldData.widget == "text" || fieldData.widget == "password" || fieldData.widget == "number" || fieldData.widget == "textarea") {
            msg = "请输入" + label;
        } else if (fieldData.widget == "radio") {
            msg = "请选择" + label;
        } else if (fieldData.widget == "uploader") {
            msg = "请选择" + label + "文件";
        } else if (fieldData.widget == "date") {
            msg = "请选择" + label;
        } else if (fieldData.widget == "datetime") {
            msg = "请选择" + label;
        } else if (fieldData.widget == "time") {
            msg = "请选择" + label;
        } else if (fieldData.widget == "checkbox") {
            msg = "请至少选项一项" + label;
        } else if (fieldData.widget == "select" || fieldData.widget == "itemselect" || fieldData.widget == "select3") {
            if (fieldData.multiple)
                msg = "请至少选项一项" + label;
            else
                msg = "请选择" + label;
        }
        return msg;
    }

    ngOnDestroy() {
        this._subscriptions.forEach((item) => {
            item.unsubscribe()
        })
    }


}
