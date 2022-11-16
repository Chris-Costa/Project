import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'login.component.html'

})
export class LoginComponent implements OnInit{

    userName: string | undefined;
    password: string | undefined;
    isIframe = false;
    loginDisplay = false;


    constructor(private msalService: MsalService, private authService:AuthService, private router:Router){ }

    ngOnInit() {
        this.isIframe = window !== window.parent && !window.opener;
      }
    
      login() {
        this.msalService.loginRedirect();
      }
    
      setLoginDisplay() {
        this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
      }
    /*
    login(formValues: string){
        //this.authService.loginUser(formValues.userName, formValues.password);
        this.authService.loginUser(formValues);
        this.router.navigate(['welcome']);
    }
    */
    cancel(){
        this.router.navigate(['welcome']);

    }
}