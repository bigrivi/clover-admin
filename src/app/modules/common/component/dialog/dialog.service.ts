import { Injectable } from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmComponent} from './confirm.component';
import {AlertComponent} from './alert.component';
import {TableViewDailogComponent} from './list.component';
import { NzModalService } from 'ng-zorro-antd';

@Injectable()
export class DialogService {

    constructor(private confirmServ: NzModalService) {}

    //确认框
    confirm(messsage:string,title = "对话框"): Promise<any> {
        // const modalRef = this.modalService.open(ConfirmComponent);
        // modalRef.componentInstance.config = { title:title,message:messsage};
        // return modalRef.result;
        return new Promise((resolve,reject) => {
            this.confirmServ.confirm({
              title: title,
              content: messsage,
              onOk() {
               resolve()
              },
              onCancel() {
                  reject()
              }
            });
        });

    }

     //提示框
    alert(messsage:String,title = "对话框"): Promise<any> {
        // const modalRef = this.modalService.open(AlertComponent);
        // modalRef.componentInstance.config = { title:title,message:messsage};
        // return modalRef.result;
        return new Promise((resolve,reject) => {

        })
    }

      //提示框
    modalTable(module:String,selectedIds = [],title = "选择"): Promise<any> {
        // const modalRef = this.modalService.open(TableViewDailogComponent,{ size: "lg" });
        // modalRef.componentInstance.config = { title:title,module:module,selectedIds:selectedIds};
        // return modalRef.result;
        return new Promise((resolve,reject) => {

        })
    }

}