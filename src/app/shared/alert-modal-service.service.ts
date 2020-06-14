import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';


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


}
