import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, combineLatest, map, tap, throwError } from "rxjs";
import { IUser } from "../shared/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userUrl = 'https://localhost:7018/User';

    constructor(private http: HttpClient) { }

    users$ = this.http.get<IUser[]>(this.userUrl).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))), 
        catchError(this.handleError)
    );
     
    private userSelectionSubject = new BehaviorSubject<string>('cfc39fe5-82d4-4d2f-8889-4e13e326911f');

    userSelected$ = this.userSelectionSubject.asObservable();
    
    activeUser$ = combineLatest([
        this.users$,
        this.userSelected$
    ]).pipe(
        map(([users, selectedUserAzureId]) =>
            users.find(user => user.azureId === selectedUserAzureId)
        ),
        tap(user => console.log('activeUser', user))
    )
    
    getActiveUser(selectedUserAzureId: string): void {
        this.userSelectionSubject.next(selectedUserAzureId);
    }
 
    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if (err.error instanceof ErrorEvent){
            errorMessage = `An error occured ${err.error.message}`;
        }
        else 
            errorMessage = `Server returned code:` 
            
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}