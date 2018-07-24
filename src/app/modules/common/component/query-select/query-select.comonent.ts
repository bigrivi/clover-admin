import { Component, Input, forwardRef } from '@angular/core';
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
        <nz-select style="width: 120px;margin-right:5px;" [(ngModel)]="subOptionValue" [nzPlaceHolder]="'请选择'">
        <nz-option
        *ngFor="let option of textSelectOptions"
        [nzLabel]="option.label"
        [nzValue]="option.value">
        </nz-option>
      </nz-select>
    </div>
    <div class="hbox" *ngIf="selectedType=='text' || selectedType=='textarea'">
        <span style="width:30px;" class="hbox b-ac" *ngIf="subOptionValue=='11' || subOptionValue=='12'">:以</span>
        <nz-input *ngIf="subOptionValue=='1' || subOptionValue=='2' || subOptionValue=='9' || subOptionValue=='10' || subOptionValue=='11' || subOptionValue=='12'" [(ngModel)]="inputValue1"></nz-input>
        <span style="width:100px;margin-left:5px;" *ngIf="subOptionValue=='11'" class="hbox b-ac">开始</span>
        <span style="width:100px;margin-left:5px;" *ngIf="subOptionValue=='12'" class="hbox b-ac">结束</span>
    </div>

    <div class="hbox" *ngIf="selectedType=='number'">
        <nz-select style="width: 120px;margin-right:5px;" [(ngModel)]="subOptionValue" [nzPlaceHolder]="'请选择'">
        <nz-option
        *ngFor="let option of numberSelectOptions"
        [nzLabel]="option.label"
        [nzValue]="option.value">
        </nz-option>
      </nz-select>
    </div>
    <div class="hbox" *ngIf="selectedType=='number'">
        <span style="width:10px;margin-left:0px;" class="hbox b-ac" *ngIf="subOptionValue=='48' || subOptionValue=='12'">:</span>
        <nz-input nzType="number" style="width: 100px;margin-right:5px;" *ngIf="subOptionValue=='1' || subOptionValue=='5' || subOptionValue=='7' || subOptionValue=='48' || subOptionValue=='12'" [(ngModel)]="inputValue1"></nz-input>
        <span style="width:10px;margin-right:5px;" class="hbox b-ac" *ngIf="subOptionValue=='48' || subOptionValue=='12'">至</span>
        <nz-input nzType="number" style="width: 100px;margin-right:5px;" *ngIf="subOptionValue=='48'" [(ngModel)]="inputValue2"></nz-input>
    </div>
    <div class="hbox" *ngIf="selectedType=='datetime' || selectedType=='date'">
        <nz-select style="width: 200px;margin-right:5px;" [(ngModel)]="subOptionValue" [nzPlaceHolder]="'请选择'">
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
        <nz-datepicker style="width: 120px;margin-right:5px;" *ngIf="subOptionValue=='18' || subOptionValue=='19' || subOptionValue=='44' || subOptionValue=='47'" [(ngModel)]="inputValue1"></nz-datepicker>
        <span style="width:10px;margin-right:5px;" class="hbox b-ac" *ngIf="subOptionValue=='47'">至</span>
        <nz-datepicker  style="width: 120px;margin-left:5px;" *ngIf="subOptionValue=='47'" [(ngModel)]="inputValue2"></nz-datepicker>
        <nz-input nzType="number" style="width: 100px;margin-right:5px;" *ngIf="subOptionValue=='16' || subOptionValue=='17' || subOptionValue=='53'" [(ngModel)]="inputValue1"></nz-input>
        <span style="width:50px;margin-left:0px;" class="hbox b-ac" *ngIf="subOptionValue=='16'">天之后</span>
        <span style="width:50px;margin-left:0px;" class="hbox b-ac" *ngIf="subOptionValue=='17'">天之前</span>
        <span style="width:50px;margin-left:0px;" class="hbox b-ac" *ngIf="subOptionValue=='53'">天之内</span>
    </div>
    
</div>

  `
})
export class QuerySelectComponent implements ControlValueAccessor {

    private onTouched: any = () => { }
    private valueChange: any = (value: any) => { }
    private selectedOption;
    private inputValue1 = ""
    private inputValue2 = ""
   


    //主选项
    private selectedType;

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


    _config;
    _checklist = []
    @Input() fields = []

    onMainFieldChange(value) {
        console.log(value.widget)
        this.selectedType = value.widget
        if(this.selectedType=="text" || this.selectedType=="textarea"){
            this.subOptionValue = this.textSelectOptions[0].value
        }
        else if(this.selectedType=="number"){
            this.subOptionValue = this.numberSelectOptions[0].value
        }
        else if(this.selectedType=="datetime"){
            this.subOptionValue = this.datetimeSelectOptions[0].value
        }
    }


    selected(event, index) {
        //   this._checklist[index] = event;
        //   let values = _.filter(this._config.dataSource,(item,index)=>{
        //       return this._checklist[index]
        //   })
        //   values = _.map(values,(item)=>{return item.value})
        //   this.valueChange(values.join(","))
    }

    writeValue(value: any) {
        // let values = value.split(",")
        //  _.each(this._config.dataSource,(item,index)=>{
        //     if(values.indexOf(item.value)>=0){
        //       this._checklist[index] = true;
        //     }
        // })
    }

    registerOnChange(fn: any) {
        this.valueChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn
    }
}
