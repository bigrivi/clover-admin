import { Component, Input, Inject, forwardRef } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidatorFn, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import * as _ from 'lodash';


const QUERY_SELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => QuerySelectComponent),
    multi: true
};


@Component({
    selector: 'query-select',
    providers: [QUERY_SELECT_VALUE_ACCESSOR],
    template: `
  <div style="display:flex;width:100%">
  <nz-select style="width: 120px;margin-right:5px;" [(ngModel)]="selectedOption" (ngModelChange)="onMainFieldChange($event)" [nzPlaceHolder]="'请选择'">
  <nz-option
    *ngFor="let option of fields"
    [nzLabel]="option.label"
    [nzValue]="option">
  </nz-option>
</nz-select>
    <div class="hbox" *ngIf="selectedType=='text' || selectedType=='textarea'">
        <nz-select style="width: 120px;margin-right:5px;" [(ngModel)]="subOptionValue" [nzPlaceHolder]="'请选择'" (ngModelChange)="onSubFieldChange($event)">
        <nz-option
        *ngFor="let option of textSelectOptions"
        [nzLabel]="option.label"
        [nzValue]="option.value">
        </nz-option>
      </nz-select>
    </div>
    <div class="hbox" *ngIf="selectedType=='text' || selectedType=='textarea'">
        <span style="width:30px;" class="hbox b-ac" *ngIf="subOptionValue=='11' || subOptionValue=='12'">:以</span>
        <nz-input *ngIf="subOptionValue=='1' || subOptionValue=='2' || subOptionValue=='9' || subOptionValue=='10' || subOptionValue=='11' || subOptionValue=='12'" [(ngModel)]="inputValue1" (ngModelChange)="onSubFieldChange($event)"></nz-input>
        <span style="width:100px;margin-left:5px;" *ngIf="subOptionValue=='11'" class="hbox b-ac">开始</span>
        <span style="width:100px;margin-left:5px;" *ngIf="subOptionValue=='12'" class="hbox b-ac">结束</span>
    </div>

    <div class="hbox" *ngIf="selectedType=='number'">
        <nz-select style="width: 120px;margin-right:5px;" [(ngModel)]="subOptionValue" [nzPlaceHolder]="'请选择'" (ngModelChange)="onSubFieldChange($event)">
        <nz-option
        *ngFor="let option of numberSelectOptions"
        [nzLabel]="option.label"
        [nzValue]="option.value">
        </nz-option>
      </nz-select>
    </div>
    <div class="hbox" *ngIf="selectedType=='number'">
        <span style="width:10px;margin-left:0px;" class="hbox b-ac" *ngIf="subOptionValue=='48' || subOptionValue=='12'">:</span>
        <nz-input nzType="number" (ngModelChange)="onSubFieldChange($event)" style="width: 100px;margin-right:5px;" *ngIf="subOptionValue=='1' || subOptionValue=='5' || subOptionValue=='7' || subOptionValue=='48' || subOptionValue=='12'" [(ngModel)]="inputValue1"></nz-input>
        <span style="width:10px;margin-right:5px;" class="hbox b-ac" *ngIf="subOptionValue=='48' || subOptionValue=='12'">至</span>
        <nz-input nzType="number" (ngModelChange)="onSubFieldChange($event)" style="width: 100px;margin-right:5px;" *ngIf="subOptionValue=='48'" [(ngModel)]="inputValue2"></nz-input>
    </div>
    <div class="hbox" *ngIf="selectedType=='datetime' || selectedType=='date'">
        <nz-select style="width: 200px;margin-right:5px;" [(ngModel)]="subOptionValue" [nzPlaceHolder]="'请选择'" (ngModelChange)="onSubFieldChange($event)">
        <nz-option
        *ngFor="let option of datetimeSelectOptions"
        [nzLabel]="option.label"
        [nzValue]="option.value">
        </nz-option>
      </nz-select>
    </div>
    <div class="hbox" *ngIf="selectedType=='datetime' || selectedType=='date'">
        <span style="width:10px;margin-left:0px;" class="hbox b-ac" *ngIf="subOptionValue=='16' || subOptionValue=='17' || subOptionValue=='18' || subOptionValue=='19' || subOptionValue=='53' || subOptionValue=='44' || subOptionValue=='47' ">:</span>
        <span style="width:50px;margin-left:0px;" class="hbox b-ac" *ngIf="subOptionValue=='16' || subOptionValue=='17' ||  subOptionValue=='53' ">在过去</span>
        <nz-datepicker (ngModelChange)="onSubFieldChange($event)" style="width: 120px;margin-right:5px;" *ngIf="subOptionValue=='18' || subOptionValue=='19' || subOptionValue=='44' || subOptionValue=='47'" [(ngModel)]="inputValue1"></nz-datepicker>
        <span style="width:10px;margin-right:5px;" class="hbox b-ac" *ngIf="subOptionValue=='47'">至</span>
        <nz-datepicker (ngModelChange)="onSubFieldChange($event)"  style="width: 120px;margin-left:5px;" *ngIf="subOptionValue=='47'" [(ngModel)]="inputValue2"></nz-datepicker>
        <nz-input nzType="number" style="width: 100px;margin-right:5px;" *ngIf="subOptionValue=='16' || subOptionValue=='17' || subOptionValue=='53'" [(ngModel)]="inputValue1"  (ngModelChange)="onSubFieldChange($event)"></nz-input>
        <span style="width:50px;margin-left:0px;" class="hbox b-ac" *ngIf="subOptionValue=='16'">天之后</span>
        <span style="width:50px;margin-left:0px;" class="hbox b-ac" *ngIf="subOptionValue=='17'">天之前</span>
        <span style="width:50px;margin-left:0px;" class="hbox b-ac" *ngIf="subOptionValue=='53'">天之内</span>
    </div>

    <div class="hbox" *ngIf="selectedType=='select_single'">
        <nz-select style="width: 200px;margin-right:5px;" [(ngModel)]="subOptionValue" [nzPlaceHolder]="'请选择'" (ngModelChange)="onSubFieldChange($event)">
        <nz-option
        *ngFor="let option of selectSelectOptions"
        [nzLabel]="option.label"
        [nzValue]="option.value">
        </nz-option>
      </nz-select>
    </div>

    <div class="hbox" *ngIf="selectedType=='select_multiple'">
        <nz-select  style="width: 100px;margin-right:5px;" [(ngModel)]="subOptionValue" [nzPlaceHolder]="'请选择'" (ngModelChange)="onSubFieldChange($event)">
        <nz-option
        *ngFor="let option of multiSelectSelectOptions"
        [nzLabel]="option.label"
        [nzValue]="option.value">
        </nz-option>
      </nz-select>
    </div>
    <div class="hbox" style="flex:1" *ngIf="selectedType=='select_multiple'">
        <nz-select nzAllowClear (ngModelChange)="onSubFieldChange($event)"  [nzMode]="'multiple'" style="width:100%"  [(ngModel)]="inputValue1" [nzPlaceHolder]="'请选择'">
        <nz-option
        *ngFor="let option of selectSelectOptions"
        [nzLabel]="option.label"
        [nzValue]="option.value">
        </nz-option>
        </nz-select>
    </div>
    
</div>

  `
})
export class QuerySelectComponent implements ControlValueAccessor {

    constructor(@Inject("DataApiService") private dataApiService) {

    }

    private onTouched: any = () => { }
    private valueChange: any = (value: any) => { }
    private selectedOption;
    private inputValue1 = ""
    private inputValue2 = ""



    //主选项
    private selectedType;

    //主选项字段名
    private selectedField;

    //子选项值
    private subOptionValue = ""

    //文本类型
    textSelectOptions = [
        { value: '1', label: '等于' },
        { value: '2', label: '不等于' },
        { value: '4', label: '不为空' },
        { value: '9', label: '包含' },
        { value: '10', label: '不包含' },
        { value: '11', label: '以某某开始' },
        { value: '12', label: '以某某结束' },
        { value: '45', label: '为空' }
    ];

    //文本类型
    numberSelectOptions = [
        { value: '1', label: '等于' },
        { value: '5', label: '大于' },
        { value: '7', label: '小于' },
        { value: '24', label: '为零' },
        { value: '48', label: '指定范围' },
    ];

    //日期实际类型
    datetimeSelectOptions = [
        { value: '14', label: '为今天' },
        { value: '15', label: '为昨天' },
        { value: '40', label: '为本周' },
        { value: '41', label: '为上周' },
        { value: '27', label: '为本月' },
        { value: '28', label: '为上月' },
        { value: '42', label: '为本季度' },
        { value: '43', label: '为上季度' },
        { value: '29', label: '为今年' },
        { value: '30', label: '为去年' },
        { value: '16', label: '在过去××天之后' },
        { value: '17', label: '在过去××天之前' },
        { value: '53', label: '在过去××天之内' },
        { value: '18', label: '在指定具体时间之后' },
        { value: '19', label: '在指定具体时间之前' },
        { value: '44', label: '为指定时间' },
        { value: '47', label: '为指定时间范围' },
        { value: '46', label: '为空' }
    ];

    //选择类型
    multiSelectSelectOptions = [
        { value: '1', label: '等于' },
        { value: '2', label: '不等于' }
    ];

    selectSelectOptions = [

    ];


    _config;
    _checklist = []
    @Input() fields = []

    onMainFieldChange(value) {
        this.subOptionValue = ""
        this.inputValue1 = ""
        this.inputValue2 = ""
        let widget = value.widget
        if (widget == "text" || widget == "textarea") {
            this.subOptionValue = this.textSelectOptions[0].value
        }
        else if (widget == "number") {
            this.subOptionValue = this.numberSelectOptions[0].value
        }
        else if (widget == "datetime") {
            this.subOptionValue = this.datetimeSelectOptions[0].value
        }
        else if (widget == "select") {
            if (value.multiple) {
                widget += "_multiple"
                this.subOptionValue = "1"
            } else {
                widget += "_single"
                this.subOptionValue = ""
            }
            if (!_.isArray(value.dataSource)) {
                this.loadDataSource(value)
            }
            else {
                this.selectSelectOptions = value.dataSource
            }
        }
        this.selectedType = widget
        this.selectedField = value.field
        this.updateValue()
    }

    onSubFieldChange() {
        setTimeout(() => {
            this.updateValue()
        }, 0)
    }

    loadDataSource(config) {
        let moduleArr = config.dataSource.split(".")
        let apiName = `${moduleArr[0]}.${moduleArr[1]}DataApi`;
        let dataApi = this.dataApiService.get(apiName)
        let moduleConfig = dataApi.config
        let resource = dataApi.resource
        let params = {}
        if (config.queryParams) {
            params = Object.assign(params, config.queryParams)
        }
        params["sort"] = "ord"
        this.selectSelectOptions = []
        resource.get(params).map((res) => res.json().data).subscribe((res) => {
            let dataSource = _.map(res, (item) => {
                let label = item[moduleConfig.labelField || "name"]
                if (!config.multiple) {
                    label = "为" + label
                }
                return {
                    label: label,
                    value: item[moduleConfig.valueField || "_id"]
                }

            })
            this.selectSelectOptions = dataSource
        })
    }



    writeValue(value: any) {
        this.selectedField = value.selectedField
        this.selectedType = value.selectType
        this.subOptionValue = value.subOptionValue
        this.inputValue1 = value.inputValue1
        this.inputValue2 = value.inputValue2
        this.fields.forEach((item) => {
            if (item.field == this.selectedField) {
                this.selectedOption = item
                if (this.selectedType == "select_single" || this.selectedType == "select_multiple") {
                    this.loadDataSource(item)
                }
            }

        })

    }

    updateValue() {
        let value = {
            selectedField: this.selectedField,
            selectType: this.selectedType,
            subOptionValue: this.subOptionValue,
            inputValue1: this.inputValue1,
            inputValue2: this.inputValue2
        }
        this.valueChange(value)
    }

    registerOnChange(fn: any) {
        this.valueChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn
    }
}
