import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, combineLatest, map, merge, scan, Subject, tap, throwError } from "rxjs";
import { IExercise } from "./exercise";
import { IWorkout } from "./workoutList/workout";

@Injectable({
    providedIn: 'root'
})
export class ExerciseService{
    private exerciseUrl = 'assets/json/exercises.json';
    private workoutListUrl = 'assets/json/workouts.json';

    constructor (private http: HttpClient) { }
    //observable to get all exercises
    exercises$ = this.http.get<IExercise[]>(this.exerciseUrl).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))), 
        catchError(this.handleError)
    );
    //behavior subject to react to user selection getting the id of selected exercise
    private exerciseSelectionSubject = new BehaviorSubject<number>(0);
    exerciseSelected$ = this.exerciseSelectionSubject.asObservable();
    //observable to get selected exercise
    selectedExercise$ = combineLatest([
        this.exercises$,
        this.exerciseSelected$
    ]).pipe(
        map(([exercises, selectedExerciseId]) =>
            exercises.find(exercise => exercise.exerciseId === selectedExerciseId)
        ),
        tap(exercise => console.log('selectedExercise', exercise))
    )
    //fucntion to update selected exercise
    selectedExerciseChanged(selectedExerciseId: number): void {
        this.exerciseSelectionSubject.next(selectedExerciseId);
    }
    //observable for pre-existing workouts
    workouts$ = this.http.get<IWorkout[]>(this.workoutListUrl).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))), 
        catchError(this.handleError)
    );
    //add new workout to list
    private workoutInsertedSubject = new Subject<IWorkout>();
    workoutInsertedAction$ = this.workoutInsertedSubject.asObservable();
    //combine exisitng stream with new workout
    workoutsWithAdd$ = merge(
        this.workouts$,
        this.workoutInsertedAction$
    ).pipe(
        scan((acc, value) =>
        (value instanceof Array) ? [...value] : [...acc, value], [] as IWorkout[])
    )
    //function to add new workout
    addExercise(newExercise: IWorkout) {
        this.workoutInsertedSubject.next(newExercise)
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
//backend example for http post adding workout 
/*
merge(
    this.product$,
    this.insertAction$
        .pipe(
            concatMap(newProd => {
                return this.http.post<Product>(this.url, newProd)
            }),
        ))
    .pipe(
        scan((acc, value) =>
        (value instanceof Array) ? [...value] ; [...acc, value], [] as Product[])
    );
*/