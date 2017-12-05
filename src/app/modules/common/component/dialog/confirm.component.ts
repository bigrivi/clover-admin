import { Component,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-dialog-confirm',
  template: `
    <div class="modal-header">
      <span>{{ config.title }}</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      {{ config.message }}
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-secondary" (click)="closeModal()">取消</button>
      <button class="btn btn-md btn-danger" (click)="approve()">确认</button>
    </div>
  `,
})
export class ConfirmComponent {

 @Input() config = {};

  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.dismiss({ status : 'closed' });
  }

  approve(){
    this.activeModal.close({ status : 'approved' });
  }
}
