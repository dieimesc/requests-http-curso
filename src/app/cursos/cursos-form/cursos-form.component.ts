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

    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap((id) => this.service.loadById(id))
      )
      .subscribe(curso => this.updateForm(curso));       
        
      this.form = this.fb.group({
      id: [null],
      nome: [null, [Validators.minLength(3), Validators.maxLength(40), Validators.required]]

    })

  }
  updateForm(curso) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    })
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid)
      console.log('submit');
    this.service.create(this.form.value).subscribe(
      succcess => { this.modal.showAlertSuccess('sucesso'); this.location.back(); },
      error => this.modal.showAlertDanger("Erro ao cadastrar curso"),
      () => console.log('request completo'));

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
