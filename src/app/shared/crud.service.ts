
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

  
  private readonly API = `${environment.API}cursos`;
  constructor(protected http: HttpClient, private API_URL:string ) {}

  list() {
    return this.http.get<T[]>(this.API_URL)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }
  loadById(id)  {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

 private update(record: T){
   return this.http.put(`${this.API_URL}/${ record['id'] }`, record).pipe(take(1));
 }

  private create(record: T)  {
    return this.http.post(this.API_URL, record).pipe(take(1));
  }
  save(record){
    if(record.id){
      return this.update(record);      
    }
    return this.create(record);

  }
  remove(id){
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
