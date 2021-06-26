import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserViewModel } from './user-view-model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  endPoint = 'http://localhost:60108/user';

  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  login(user:UserViewModel): Observable<any> {
    return this.httpClient.post<any>(this.endPoint + '/login',user)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }

  
  register(user:UserViewModel): Observable<any> {
    return this.httpClient.post<any>(this.endPoint + '/register',user)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }
  httpError(error:any) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }

}
