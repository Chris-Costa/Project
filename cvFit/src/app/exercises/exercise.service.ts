import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, combineLatest, map, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { IExercise } from "../shared/exercise";

@Injectable({
    providedIn: 'root'
})
export class ExerciseService{
    private exerciseUrl = environment.baseUrl + 'exercise';
    
    constructor (private http: HttpClient) { }
  
    exercises$ = this.http.get<IExercise[]>(this.exerciseUrl).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))), 
        catchError(this.handleError)
    );
    
    private exerciseSelectionSubject = new BehaviorSubject<number>(0);

    exerciseSelected$ = this.exerciseSelectionSubject.asObservable();
    
    selectedExercise$ = combineLatest([
        this.exercises$,
        this.exerciseSelected$
    ]).pipe(
        map(([exercises, selectedExerciseId]) =>
            exercises.find(exercise => exercise.id === selectedExerciseId)
        ),
        tap(exercise => console.log('selectedExercise', exercise))
    )
    
    selectedExerciseChanged(selectedExerciseId: number): void {
        this.exerciseSelectionSubject.next(selectedExerciseId);
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