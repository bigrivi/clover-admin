  import { Component,Input,ViewChild,Injector } from '@angular/core';
  import {AppService} from '../../../common/services/app.service'
  import {TableViewComponent} from "../table-view/table-view.component"
  import { NzModalSubject } from 'ng-zorro-antd';

  @Component({
    selector: 'ngx-dialog-list',
    template: `
      <div class="modal-body">
        <table-view [initSelectedIds]="initSelectedIds" (onSelectedChange)="onSelectedChange($event)" [modalMode]="true"  [config]="tableConfig"></table-view>
      </div>
      <div class="customize-footer">
          <button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="emitDataOutside($event)">
            确定
          </button>
          <button nz-button [nzType]="'default'" [nzSize]="'large'" (click)="handleCancel($event)">
            取消
          </button>
        </div>
    `,
     styles  : [
        `
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
  export class TableViewDailogComponent {

   @Input() config = {};
   tableConfig;


    initSelectedIds = [];
    selectedObjs = [];
    constructor(private subject:NzModalSubject ,private injector:Injector) {
      this.subject.on('onDestory', () => {
        console.log('destroy');
      });
     }

     ngOnInit(){
         let module = this.config["module"].split(".");
         let apiName = `${module[0]}.${module[1]}DataApi`;
         this.tableConfig = this.injector.get(apiName).config
         this.initSelectedIds = this.config["selectedIds"] || []
     }



     emitDataOutside() {
        this.subject.next(this.selectedObjs);
      }

      handleCancel(e) {
        this.subject.destroy('onCancel');
      }

    onSelectedChange(event){
      this.selectedObjs = event
    }


  }
