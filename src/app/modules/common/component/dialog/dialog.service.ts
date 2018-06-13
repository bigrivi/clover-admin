import { Injectable } from '@angular/core';
import { TableViewDailogComponent } from './list.component';
import { EditDialogComponent } from './edit.component';
import { ExportDialogComponent } from './export.component';
import { ParameterDialogComponent } from './parameter.component';

import { NzModalService } from 'ng-zorro-antd';
import * as _ from 'lodash';

@Injectable()
export class DialogService {

    constructor(private modalService: NzModalService) { }

    //确认框
    confirm(messsage: string, title = "对话框"): Promise<any> {
        return new Promise((resolve, reject) => {
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
    alert(messsage: String, title = "对话框"): Promise<any> {
        return new Promise((resolve, reject) => {

        })
    }

    modalTable(module: String, selectedIds = [], title = "选择"): Promise<any> {
        return new Promise((resolve, reject) => {
            const currentModal = this.modalService.open({
                title: title,
                width: "70%",
                content: TableViewDailogComponent,
                onOk() {

                },
                onCancel() {
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

        })
    }


    openEditDialog(app: String, module: String, params: any): Promise<any> {
        let title = params.id ? "修改" : "添加"
        return new Promise((resolve, reject) => {
            const currentModal = this.modalService.open({
                title: title,
                width: "70%",
                wrapClassName: "no-padding",
                content: EditDialogComponent,
                onOk() {

                },
                onCancel() {
                    // if(reject)
                    //   reject("cancel")
                },
                footer: false,
                componentParams: {
                    config: { title: title, app: app, module: module, params: params }
                }
            });
            currentModal.subscribe(result => {
                if (_.isObject(result)) {
                    currentModal.destroy('onOk');
                    resolve(result)
                }
            })

        })
    }


    openExportDialog(app: String, module: String, params: any = {}): Promise<any> {
        let title = "导出"
        return new Promise((resolve, reject) => {
            const currentModal = this.modalService.open({
                title: title,
                width: "70%",
                content: ExportDialogComponent,
                onOk() {

                },
                onCancel() {
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

        })
    }


    openParameterDialog(group: String, params: any = {}): Promise<any> {
        let title = "分类编辑 - 客户状态"
        return new Promise((resolve, reject) => {
            const currentModal = this.modalService.open({
                title: title,
                width: "550px",
                content: ParameterDialogComponent,
                onOk() {

                },
                onCancel() {

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

        })
    }




}
