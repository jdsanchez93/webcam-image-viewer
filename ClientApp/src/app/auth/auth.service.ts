import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public isSignedIn(): Observable<boolean> {
    return this.http.get<boolean>('api/Signin/isSignedIn');
  }

  public getUserName(): Observable<string> {
    return this.http.get('api/Signin/GetUserName', { responseType: "text" });
  }
}
