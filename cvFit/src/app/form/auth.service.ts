import { Injectable } from "@angular/core";
import { IUser } from './user.model';

@Injectable()
export class AuthService {
    currentUser: IUser | undefined ;
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
}