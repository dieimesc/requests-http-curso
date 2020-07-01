import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Curso } from 'src/app/curso';
import { CursosService } from 'src/app/cursos.service';

@Injectable({
  providedIn: 'root'
})

export class CursoResolverGuard implements Resolve<Curso> {

  constructor(private service: CursosService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Curso> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    else {
      return of({
        id: null,
        nome: null
      });
    }
  }
}

