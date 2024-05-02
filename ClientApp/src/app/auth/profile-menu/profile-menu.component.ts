import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIconModule, RouterLink ],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss'
})
export class ProfileMenuComponent implements OnInit {

  isSignedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isSignedIn()
      .pipe(
        tap(x => this.isSignedIn = x)
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