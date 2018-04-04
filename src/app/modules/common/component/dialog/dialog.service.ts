import { Injectable } from '@angular/core';
import {TableViewDailogComponent} from './list.component';
import { NzModalService } from 'ng-zorro-antd';
import * as _ from 'lodash';

@Injectable()
export class DialogService {

    constructor(private modalService: NzModalService) {}

    //确认框
    confirm(messsage:string,title = "对话框"): Promise<any> {
        // const modalRef = this.modalService.open(ConfirmComponent);
        // modalRef.componentInstance.config = { title:title,message:messsage};
        // return modalRef.result;
        return new Promise((resolve,reject) => {
            this.modalService.confirm({
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
        return new Promise((resolve,reject) => {
             const currentModal = this.modalService.open({
                title          : title,
                width          :"70%",
                content        : TableViewDailogComponent,
                onOk() {

                },
                onCancel() {
                    // if(reject)
                    //   reject("cancel")
                },
                footer         : false,
                componentParams: {
                  config:{ title:title,module:module,selectedIds:selectedIds}
                }
              });
              currentModal.subscribe(result => {
                // console.log(result);
                if(_.isArray(result)){
                  currentModal.destroy('onOk');
                  resolve(result)
                }

              })

        })
    }

}