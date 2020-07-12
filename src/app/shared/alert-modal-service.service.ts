import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { Observable, Subject } from 'rxjs';


export enum AlertTypes{
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalServiceService {

  constructor(private bsModalService: BsModalService) { }

  private showAlert(message: string, type: string,  dismissTimeOut? : number) {
    const bsModalRef: BsModalRef = this.bsModalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if(dismissTimeOut){
      setTimeout(() =>  bsModalRef.hide(), dismissTimeOut );
    }



  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);

  }
  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);

  }

  showConfirm(title: string, msg: string, msgOk? : string, msgCancel?: string){
    const bsModalRef: BsModalRef = this.bsModalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.msgModal = msg;
    
    if(msgOk)
      bsModalRef.content.msgOk = msgOk;

    if(msgCancel)
      bsModalRef.content.msgCancel = msgCancel;

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult; 


  }
  


}
