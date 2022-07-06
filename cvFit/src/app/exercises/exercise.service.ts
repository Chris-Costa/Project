import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { IExercise } from "./exercise";

@Injectable({
    providedIn: 'root'
})
export class ExerciseService{
    private exerciseUrl = 'assets/exercises/exercises.json';

    constructor (private http: HttpClient) { }
    
    getExercises(): Observable<IExercise[]>{
        return this.http.get<IExercise[]>(this.exerciseUrl).pipe(
            tap(data => console.log('All: ', JSON.stringify(data))), 
            catchError(this.handleError)
        );
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