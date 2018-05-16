import { Injectable } from '@angular/core';
import { TableViewDailogComponent } from './list.component';
import { EditDialogComponent } from './edit.component';
import { ExportDialogComponent } from './export.component';
import { ParameterDialogComponent } from './parameter.component';

import { NzModalService,NzModalSubject } from 'ng-zorro-antd';
import * as _ from 'lodash';

@Injectable()
export class DialogService {

    private _dialogs:NzModalSubject[] = null;
    constructor(private modalService: NzModalService) { 
        this._dialogs = []
    }

    //确认框
    confirm(messsage: string, title = "对话框"): Promise<any> {
        return new Promise((resolve, reject) => {
            let self = this;
            let currentModal = this.modalService.confirm({
                title: title,
                content: messsage,
                onOk() {
                    self._dialogs.splice( self._dialogs.indexOf(currentModal),1)
                    resolve()
                },
                onCancel() {
                    self._dialogs.splice( self._dialogs.indexOf(currentModal),1)
                    reject()
                }
            });
            this._dialogs.push(currentModal)
        });

    }


    modalTable(module: String, selectedIds = [], title = "选择"): Promise<any> {
        return new Promise((resolve, reject) => {
            let self = this;
            const currentModal = this.modalService.open({
                title: title,
                width: "70%",
                content: TableViewDailogComponent,
                onOk() {
                    self._dialogs.splice( self._dialogs.indexOf(currentModal),1)
                },
                onCancel() {
                    self._dialogs.splice( self._dialogs.indexOf(currentModal),1)
                    // if(reject)
                    //   reject("cancel")
                },
                footer: false,
                componentParams: {
                    config: { title: title, module: module, selectedIds: selectedIds }
                }
            });
            currentModal.subscribe(result => {
                // console.log(result);
                if (_.isArray(result)) {
                    currentModal.destroy('onOk');
                    resolve(result)
                }

            })
            this._dialogs.push(currentModal)

        })
    }


    openEditDialog(formConfig, params: any): Promise<any> {
        let title = params.id ? "修改" : "添加"
        return new Promise((resolve, reject) => {
            let self = this;
            const currentModal = this.modalService.open({
                title: title,
                width: "70%",
                wrapClassName: "no-padding",
                content: EditDialogComponent,
                onOk() {
                    self._dialogs.splice( self._dialogs.indexOf(currentModal),1)
                },
                onCancel() {
                    self._dialogs.splice( self._dialogs.indexOf(currentModal),1)
                    // if(reject)
                    //   reject("cancel")
                },
                footer: false,
                componentParams: {
                    config: { title: title, formConfig:formConfig, params: params }
                }
            });
            currentModal.subscribe(result => {
                if (_.isObject(result)) {
                    currentModal.destroy('onOk');
                    resolve(result)
                }
            })
            this._dialogs.push(currentModal)


        })
    }


    openExportDialog(app: String, module: String, params: any = {}): Promise<any> {
        let title = "导出"
        return new Promise((resolve, reject) => {
            let self = this;
            const currentModal = this.modalService.open({
                title: title,
                width: "70%",
                content: ExportDialogComponent,
                onOk() {
                    self._dialogs.splice( self._dialogs.indexOf(currentModal),1)
                },
                onCancel() {
                    self._dialogs.splice( self._dialogs.indexOf(currentModal),1)
                    // if(reject)
                    //   reject("cancel")
                },
                footer: false,
                componentParams: {
                    app: app,
                    module: module,
                    params: params
                }
            });
            currentModal.subscribe(result => {
                if (_.isObject(result)) {
                    currentModal.destroy('onOk');
                    resolve(result)
                }
            })
            this._dialogs.push(currentModal)

        })
    }


    openParameterDialog(group: String, params: any = {}): Promise<any> {
        let title = "分类编辑 - 客户状态"
        return new Promise((resolve, reject) => {
            let self = this;
            const currentModal = this.modalService.open({
                title: title,
                width: "550px",
                content: ParameterDialogComponent,
                onOk() {
                    self._dialogs.splice( self._dialogs.indexOf(currentModal),1)

                },
                onCancel() {
                    self._dialogs.splice( self._dialogs.indexOf(currentModal),1)
                },
                footer: false,
                zIndex: 2000,
                componentParams: {
                    params: params,
                    group: group
                }
            });
            currentModal.subscribe(result => {
                if (_.isObject(result)) {
                    currentModal.destroy('onOk');
                    resolve(result)
                }
            })
            this._dialogs.push(currentModal)

        })
    }

    closeAll(){
        this._dialogs.forEach((item)=>{
            item.destroy("onCancel")
        })
        this._dialogs = []
    }



}
