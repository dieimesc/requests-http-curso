import { CursosService } from './../../cursos.service';
import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/curso';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/alert-modal/alert-modal.component';
import { AlertModalServiceService } from 'src/app/shared/alert-modal-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  bsModalRef: BsModalRef;
  constructor(private service: CursosService , 
              private alertService: AlertModalServiceService,
              private router : Router,
              private route : ActivatedRoute
              /*, private bsModalService: BsModalService*/) { }

  ngOnInit() {
    // this.service.list()
    // .subscribe(dados => this.cursos = dados);

    this.onRefresh();      
  }

  onRefresh() {
    this.cursos$ = this.service.list()
    .pipe(
      catchError(error => 
        { 
          console.error(error);
          //this.error$.next(true);
          this.handleError();
          return empty();
        }));      

    
  }
  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar os cursos. Tente novamente mais tarde.');
    // this.bsModalRef = this.bsModalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar os cursos. Tente novamente mais tarde.';
  }
  onEdit(id: number){
    this.router.navigate(['editar', id], { relativeTo: this.route  });

  }

}
