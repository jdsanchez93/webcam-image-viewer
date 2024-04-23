import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { map, mergeMap, of, tap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userName: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isSignedIn()
      .pipe(
        mergeMap(isSignedIn => {
          if (isSignedIn) {
            return this.authService.getUserName()
          }
          return of('not signed in')
        }),
        tap(x => this.userName = x)
      )
      .subscribe();
  }



}
