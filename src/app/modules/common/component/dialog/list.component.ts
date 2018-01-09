import { Component,Input,ViewChild,Injector } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '../../../common/services/app.service'
import {TableViewComponent} from "../table-view/table-view.component"

@Component({
  selector: 'ngx-dialog-list',
  template: `
    <div class="modal-header">
      <span>{{ config.title }}</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <table-view [initSelectedIds]="initSelectedIds" (onSelectedChange)="onSelectedChange($event)" [modalMode]="true"  [config]="tableConfig"></table-view>
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-secondary" (click)="closeModal()">取消</button>
      <button class="btn btn-md btn-danger" (click)="approve()">确认</button>
    </div>
  `,
})
export class TableViewDailogComponent {

 @Input() config = {};
 tableConfig;


  initSelectedIds = [];
  selectedObjs = [];
  constructor(private activeModal: NgbActiveModal,public injector:Injector) {
       
   }

   ngOnInit(){
       let module = this.config["module"].split(".");
       let apiName = `${module[0]}.${module[1]}DataApi`;
       this.tableConfig = this.injector.get(apiName).config 
       this.initSelectedIds = this.config["selectedIds"] || []
   }

  closeModal() {
    this.activeModal.dismiss({ status : 'closed' });
  }

  onSelectedChange(event){
    this.selectedObjs = event
  }

  approve(){
     this.activeModal.close({ status : 'approved',selectedObjs:this.selectedObjs });
  }
}
