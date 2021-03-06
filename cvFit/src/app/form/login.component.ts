import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ConnectableObservable } from 'rxjs';

@Component({
    templateUrl: 'login.component.html'

})
export class LoginComponent{
    userName: string| undefined
    password: string | undefined;

    constructor(private authService:AuthService){

    }
    login(formValues: string){
        //this.authService.loginUser(formValues.userName, formValues.password)
        this.authService.loginUser(formValues);
        
    }
}