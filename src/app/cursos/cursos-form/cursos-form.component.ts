import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CursosService } from 'src/app/cursos.service';
import { AlertModalServiceService } from 'src/app/shared/alert-modal-service.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  public form: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModalServiceService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     console.log(id);
    //     const curso$ = this.service.loadById(id);
    //     curso$.subscribe(curso => {
    //       this.updateForm(curso);
    //     });
    //   });

    // this.route.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap((id) => this.service.loadById(id))
    //   )
    //   .subscribe(curso => this.updateForm(curso));       
    
    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
    id: [curso.id],
    nome: [curso.nome, [Validators.minLength(3), Validators.maxLength(40), Validators.required]]

    });

  }
  // updateForm(curso) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   })
  // }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid)
      console.log('submit');

    let msgSucesso = '';
    let msgErro = '';
    if(this.form.value.id){
      msgSucesso = 'Curso atualizado com sucesso';
      msgErro = 'Erro ao atualizar curso, tente novamente mais tarde.'
    }
    else{
      msgSucesso = 'curso cadastrado com sucesso';
      msgErro = 'erro ao cadastrar curso. tente novamente mais tarde.';
    }

    this.service.save(this.form.value).subscribe(
      success =>{ this.modal.showAlertSuccess(msgSucesso); this.location.back(); },
      error => { this.modal.showAlertDanger(msgErro)}
    )  

    // if (this.form.value.id) {
    //   this.service.update(this.form.value).subscribe(
    //     succcess => { this.modal.showAlertSuccess('sucesso'); this.location.back(); },
    //     error => this.modal.showAlertDanger("Erro ao atualizar curso"),
    //     () => console.log('update completo'));
    // }
    // else {
    //   this.service.create(this.form.value).subscribe(
    //     succcess => { this.modal.showAlertSuccess('sucesso'); this.location.back(); },
    //     error => this.modal.showAlertDanger("Erro ao cadastrar curso"),
    //     () => console.log('request completo'));
    // }

  }
  onCancel() {
    this.submitted = false;
    this.form.reset();
    console.log('cancel');
  }
  hasError(field: string) {
    return this.form.get(field).errors;
  }
}
