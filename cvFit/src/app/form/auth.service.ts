import { Injectable } from "@angular/core";
import { IUser } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    currentUser!: IUser;
    show : boolean = false;

    loginUser(userName: string){
        this.currentUser = {
            id: 1,
            userName: userName,
            firstName: 'Tommy',
            lastName: 'Johnson'
        }
    }
    isAuth(){
        return !!this.currentUser;
    }
    updateCurrentUser(firstName: string, lastName: string){
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
    }  
}