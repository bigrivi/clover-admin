import { Component,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-dialog-alert',
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
      <button class="btn btn-md btn-secondary" (click)="closeModal()">确定</button>
    </div>
  `,
})
export class AlertComponent {

 @Input() config = {};

  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.dismiss({ status : 'closed' });
  }


}
