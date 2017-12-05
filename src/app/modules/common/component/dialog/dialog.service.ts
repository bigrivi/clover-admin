import { Injectable } from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmComponent} from './confirm.component';
import {AlertComponent} from './alert.component';

@Injectable()
export class DialogService {

    constructor(private modalService: NgbModal) {}

    //确认框
    confirm(messsage:String,title = "对话框"): Promise<any> {
        const modalRef = this.modalService.open(ConfirmComponent);
        modalRef.componentInstance.config = { title:title,message:messsage};
        return modalRef.result;
    }

     //提示框
    alert(messsage:String,title = "对话框"): Promise<any> {
        const modalRef = this.modalService.open(AlertComponent);
        modalRef.componentInstance.config = { title:title,message:messsage};
        return modalRef.result;
    }

}