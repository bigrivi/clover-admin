import { Injectable, NgModuleFactoryLoader, Injector } from '@angular/core';
import { TableViewDailogComponent } from './list.component';
import { EditDialogComponent } from './edit.component';
import { ExportDialogComponent } from './export.component';
import { ParameterDialogComponent } from './parameter.component';
import { SerachDialogComponent } from './search.component';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { NzModalService, NzModalSubject,NzModalComponent } from 'ng-zorro-antd';
import * as _ from 'lodash';

@Injectable()
export class DialogService {

    private _dialogs: NzModalSubject[] = null;
    constructor(private overlay: Overlay,private modalService: NzModalService, public ngModuleFactoryLoader: NgModuleFactoryLoader, public injector: Injector) {
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
                    self._dialogs.splice(self._dialogs.indexOf(currentModal), 1)
                    resolve()
                },
                onCancel() {
                    self._dialogs.splice(self._dialogs.indexOf(currentModal), 1)
                    reject()
                }
            });
            this._dialogs.push(currentModal)
        });

    }

    //提示框
    alert(messsage: String, title = "对话框"): Promise<any> {
        return new Promise((resolve, reject) => {

        })
    }


    modalTable(module: String, selectedIds = [], title = "选择"): Promise<any> {
        return new Promise((resolve, reject) => {
            let self = this;
            const currentModal = this.modalService.open({
                title: title,
                width: "70%",
                content: TableViewDailogComponent,
                onOk() {
                    self._dialogs.splice(self._dialogs.indexOf(currentModal), 1)
                },
                onCancel() {
                    self._dialogs.splice(self._dialogs.indexOf(currentModal), 1)
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
                    self._dialogs.splice(self._dialogs.indexOf(currentModal), 1)
                },
                onCancel() {
                    self._dialogs.splice(self._dialogs.indexOf(currentModal), 1)
                    // if(reject)
                    //   reject("cancel")
                },
                footer: false,
                componentParams: {
                    config: { title: title, formConfig: formConfig, params: params }
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
                    self._dialogs.splice(self._dialogs.indexOf(currentModal), 1)
                },
                onCancel() {
                    self._dialogs.splice(self._dialogs.indexOf(currentModal), 1)
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
                width: "650px",
                content: ParameterDialogComponent,
                onOk() {
                    self._dialogs.splice(self._dialogs.indexOf(currentModal), 1)

                },
                onCancel() {
                    self._dialogs.splice(self._dialogs.indexOf(currentModal), 1)
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

    openSearchDialog(app: String, module: String, initData = []): Promise<any> {
        let title = "高级搜索"
        return new Promise((resolve, reject) => {
            let self = this;
            const currentModal = this.modalService.open({
                title: title,
                width: "950px",
                content: SerachDialogComponent,
                onOk() {
                    self._dialogs.splice(self._dialogs.indexOf(currentModal), 1)

                },
                onCancel() {
                    self._dialogs.splice(self._dialogs.indexOf(currentModal), 1)
                },
                footer: false,
                zIndex: 999,
                componentParams: {
                    app: app,
                    module: module,
                    initData: initData
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

    openCustomerDialog(title,params = {}, componentCls: any,modulePath) {

        this.ngModuleFactoryLoader.load(modulePath).then((factory) => {
            console.log(factory)
            const module = factory.create(this.injector)
            const r = module.componentFactoryResolver
            console.log(params)
            const cmpFactory:any = r.resolveComponentFactory(componentCls)
            // const compRef:any = cmpFactory.create(this.injector)
            // let overlayRef = this.overlay.create();
            // let modalRef = overlayRef.attach(new ComponentPortal(NzModalComponent));
            // Object.assign(modalRef.instance, { nzTitle: title,nzContent: cmpFactory,nzWidth: "950px",footer: false})
            // modalRef.instance.open();
            // console.log(modalRef)
            return new Promise((resolve, reject) => {
                let self = this;
                const currentModal = this.modalService.open({
                    title: title,
                    width: "950px",
                    componentParams: params,
                    content: cmpFactory,
                    onOk() {
                        self._dialogs.splice(self._dialogs.indexOf(currentModal), 1)
                    },
                    onCancel() {
                        self._dialogs.splice(self._dialogs.indexOf(currentModal), 1)
                    },
                    footer: false,
                    zIndex: 999
                });
                currentModal.subscribe(result => {
                    if (_.isObject(result)) {
                        currentModal.destroy('onOk');
                        resolve(result)
                    }
                })
                this._dialogs.push(currentModal)

            })
        })

    }

    closeAll() {
        this._dialogs.forEach((item) => {
            item.destroy("onCancel")
        })
        this._dialogs = []
    }



}
