import { CursosService } from './../../cursos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from 'src/app/curso';
import { Observable, empty,  Subject, EMPTY } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/alert-modal/alert-modal.component';
import { AlertModalServiceService } from 'src/app/shared/alert-modal-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Curso2Service } from 'src/app/curso2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  bsModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  cursoSelecionado: Curso;


  @ViewChild('deleteModal') deleteModal;

  constructor(private service: Curso2Service , 
              private alertService: AlertModalServiceService,
              private router : Router,
              private route : ActivatedRoute,
              private modalService: BsModalService) { }

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
  onDelete(curso: Curso ){
    this.cursoSelecionado = curso;
    //this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza?');
    result$.asObservable().pipe(
      take(1),
        switchMap( result => result ? this.service.remove(this.cursoSelecionado.id) : EMPTY )
      ).subscribe(
        success => this.onRefresh(),
        error => this.alertService.showAlertDanger('Erro ao deletar o curso. Tente novamente mais tarde.')
      );     

  }
  onConfirmDelete(){
    this.service.remove(this.cursoSelecionado.id)
    .subscribe(
      success => this.onRefresh(),
      error => this.alertService.showAlertDanger('Erro ao deletar o curso. Tente novamente mais tarde.')
    );
    this.deleteModalRef.hide();

  }
  onDeclineDelete(){
    this.deleteModalRef.hide();
  }
  


}
