import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title:string;
  @Input() msgOk = 'Ok';
  @Input() msgModal = '';
  @Input() msgCancel = 'Cancelar';
  
  confirmResult: Subject<boolean>;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.confirmResult = new Subject();
  }
  onClose(){
    this.confirmAndClose(false);
  }
  onConfirm(){
    this.confirmAndClose(true);

  }
  private confirmAndClose(status: boolean){
    this.confirmResult.next(status);
    this.bsModalRef.hide();
  }

}
