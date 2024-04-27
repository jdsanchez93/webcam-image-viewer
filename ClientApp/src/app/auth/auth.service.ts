import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public isSignedIn(): Observable<boolean> {
    return this.http.get<boolean>('api/Signin/isSignedIn');
  }

  public getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>('api/Signin/GetUserProfile');
  }

  public signin() {
    window.location.href = "/login";
  }

  public signout() {
    window.location.href = "/signout";
  }
}
