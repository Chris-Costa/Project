import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from './form/auth.service';
import { ProfileComponent } from './form/profile.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public auth:AuthService, public dialog: MatDialog, private router: Router) {}

  openDialog() {
    this.dialog.open(ProfileComponent, {
      width: '500px',
    });
  }
  logout(){
    this.router.navigate(['welcome']);
    this.auth.logout().pipe(take(1)).subscribe(() => {
      this.router.navigate(['welcome']);
    })
  }
}