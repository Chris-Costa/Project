import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from './form/auth.service';
import { ProfileComponent } from './form/profile.component';
import { MsalService } from '@azure/msal-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isIframe = false;
  loginDisplay = false;

  constructor(private msalService: MsalService, public auth:AuthService, public dialog: MatDialog, private router: Router) {}
  
  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
  }

  login() {
    this.msalService.loginRedirect();
  }

  setLoginDisplay() {
    this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
  }


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