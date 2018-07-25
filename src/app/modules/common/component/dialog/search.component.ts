import { Component, Input, ViewChild, Injector, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from '../../../common/services/app.service'
import { TableViewComponent } from "../table-view/table-view.component"
import { NzModalSubject } from 'ng-zorro-antd';
import { Subscription } from 'rxjs'
import * as _ from 'lodash';
import { TranslateService } from '../../../../@core/utils/translate.service'
import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';
import { FormViewComponent } from '../../../common/component/form-view/form-view.component'
import { Router, NavigationEnd } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    FormArray,
    FormControl,
    Validators
} from '@angular/forms';

@Component({
    selector: 'ngx-dialog-serach',
    styleUrls: ["search.component.less"],
    template: `
     <div class="modal-body">
        <form nz-form [formGroup]="formGroup">
        <div *ngFor="let control of formGroup.controls;let i = index" class="row">
        <ng-container [formGroup]="control">
            <div class="left">
                <nz-select *ngIf="i>0" style="width: 120px;margin-right:5px;" [formControlName]="'joinCondition'">
                    <nz-option
                    *ngFor="let option of joinConditions"
                    [nzLabel]="option.label"
                    [nzValue]="option.value">
                    </nz-option>
                </nz-select>
                <query-select [formControlName]="'value'" [fields]="fields"></query-select>
            </div>
            <div class="right">
                <a (click)="removeRow(i)">
                    <i class="fa fa-remove remove"></i>
                    移除
                </a>
            </div>
            
            </ng-container>
        </div>
        </form>
      </div>
     <div class="customize-footer" nz-row>
         <div nz-col [nzSm]="12" style="text-align:left">
         <button nz-button [nzType]="'default'" [nzSize]="'large'" (click)="addRow()">
            添加搜索项
          </button>
         </div>
          <div nz-col [nzSm]="12">
           <button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="save()">
            保存
          </button>
          <button nz-button [nzType]="'default'" [nzSize]="'large'" (click)="handleCancel($event)">
            关闭
          </button>
         </div>

        </div>

    `
})
export class SerachDialogComponent implements OnInit {
    formGroup: FormArray;
    resource: any;
    keepValue = "";
    fields = []
    @Input() app;
    @Input() module;
    @Input() initData = [];

    joinConditions = [
        { value: 'and', label: '并且' },
        { value: 'or', label: '或者' }
      ];

    constructor(
        private subject: NzModalSubject,
        public appService: AppService,
        public translateService:TranslateService,
        private fb: FormBuilder,
        @Inject("DataApiService") private dataApiService,
        public messageService: NzMessageService,
        public router: Router) {
        this.resource = this.dataApiService.get("dataModel.parameterDataApi").resource
        this.formGroup = this.fb.array([this.fb.group({
            'joinCondition': ["and", [Validators.required]],
            'value': [{}, [Validators.required]]
        })])
    }

    ngOnInit() {

        let config = this.dataApiService.get(`${this.app}.${this.module}DataApi`).config;
        let keys = Object.keys(config.fields)
        let fields = []
        keys.forEach((item) => {
            let field = Object.assign({ field: item }, config.fields[item])
            field.label = this.translateService.instant(field.label)
            fields.push(field)
        })
        this.fields = fields
        if(this.initData.length>0){
            this.formGroup.removeAt(0)
            this.initData.forEach((item)=>{
                console.log(item)
                this.addRow(item)
            })
        }
       

    }

    addRow(data?) {
        data = data || {
            "joinCondition": "and",
            "value": {}
        }
        const { joinCondition, value } = data
        let formGroup: FormGroup = this.fb.group({
            'joinCondition': [joinCondition, [Validators.required]],
            'value': [value, [Validators.required]]
        })
        this.formGroup.push(formGroup)

    }


    onDefaultChange(index) {
        for (var i = 0; i < this.formGroup.controls.length; i++) {
            let current = this.formGroup.controls[i].get("is_default");
            if (current.value == "1" && i != index)
                current.setValue("0")
        }


    }

    removeRow(index) {
        let currentVal = this.formGroup.controls[index].get("value");
        if (currentVal.value == this.keepValue) {
            this.keepValue = ""
        }
        this.formGroup.removeAt(index)
    }

    save() {
        let queryValues = this.formGroup.value
        console.log(queryValues)
        this.subject.next(queryValues);
    }

    handleCancel(e) {
        this.subject.destroy('onCancel');
    }

    ngOnDestroy() {


    }

}
