import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { IExercise } from "./exercise";
import { IWorkout } from "./workoutList/workout";

@Injectable({
    providedIn: 'root'
})
export class ExerciseService{
    private exerciseUrl = 'assets/json/exercises.json';
    private workoutListUrl = 'assets/json/workouts.json';

    constructor (private http: HttpClient) { }
    
    //for workoutLIst
    getWL(): Observable<IWorkout[]>{
        return this.http.get<IWorkout[]>(this.workoutListUrl).pipe(tap(data => console.log('All: ', JSON.stringify(data))));
    }
    getExercises(): Observable<IExercise[]>{
        return this.http.get<IExercise[]>(this.exerciseUrl).pipe(
            tap(data => console.log('All: ', JSON.stringify(data))), 
            catchError(this.handleError)
        );
    }
    getExercise(id: number): Observable<IExercise | undefined> {
        return this.getExercises()
          .pipe(
            map((exercises: IExercise[]) => exercises.find(e => e.exerciseId === id))
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