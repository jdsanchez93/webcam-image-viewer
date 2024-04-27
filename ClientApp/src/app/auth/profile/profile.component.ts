import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { map, mergeMap, of, tap } from 'rxjs';
import { UserProfile } from '../auth.models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userProfile?: UserProfile = undefined;
  isSignedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isSignedIn()
      .pipe(
        mergeMap(isSignedIn => {
          this.isSignedIn = isSignedIn;
          if (isSignedIn) {
            return this.authService.getUserProfile()
          }
          return of(undefined)
        }),
        tap(x => this.userProfile = x)
      )
      .subscribe();
  }

  signin() {
    this.authService.signin();
  }

  signout() {
    this.authService.signout();
  }

}
