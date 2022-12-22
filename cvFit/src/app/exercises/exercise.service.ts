import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, combineLatest, map, take, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { IExercise } from "../shared/exercise";

@Injectable({
    providedIn: 'root'
})
export class ExerciseService{
    private exerciseUrl = environment.baseUrl + 'exercise';
    private idConversion : number;
    detailsMethod: boolean;
    
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
    );

    selectedExerciseChangedString(name: string){
        this.exercises$.pipe(
            take(1),
            map(exercises => exercises.find(
                exercise => exercise.name === name))
            ).subscribe(
                (data : any) => {
                    this.idConversion =  data.id;
                    this.exerciseSelectionSubject.next(this.idConversion);
                }
        );
        this.detailsMethod = false;
    }
    
    selectedExerciseChanged(selectedExerciseId: number): void {
        this.exerciseSelectionSubject.next(selectedExerciseId);
        this.detailsMethod = true;
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