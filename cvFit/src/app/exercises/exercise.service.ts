import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, combineLatest, map, merge, Observable, of, scan, Subject, tap, throwError } from "rxjs";
import { UserService } from "../azureprofile/user.service";
import { IExercise } from "../shared/exercise";
import { ILifts, IWorkout } from "../shared/workout";
import { liftP, workoutP } from "../shared/workoutP";

@Injectable({
    providedIn: 'root'
})
export class ExerciseService{
    private exerciseUrl = 'https://localhost:7018/exercise';
    private workoutListUrl = 'https://localhost:7018/Workout?userId=';
    //temp current user id
    tempCurrentUserId: number = 1;
    

    private liftUrl = 'https://localhost:7018/Lift?workoutId=';
    private liftDelete = 'https://localhost:7018/Lift/liftId?workoutId=';
    private secondLiftDelete = '&liftId=';

    private workoutDelete = 'https://localhost:7018/Workout/workoutId?userId=';
    private secondWorkoutDelete = '&workoutId=';
    

    constructor (private http: HttpClient, private userService: UserService) { }
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
            exercises.find(exercise => exercise.id === selectedExerciseId)
        ),
        tap(exercise => console.log('selectedExercise', exercise))
    )
    //fucntion to update selected exercise
    selectedExerciseChanged(selectedExerciseId: number): void {
        this.exerciseSelectionSubject.next(selectedExerciseId);
    }
    //observable for pre-existing workouts
    workouts$ = this.http.get<IWorkout[]>(this.workoutListUrl + this.tempCurrentUserId).pipe(
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

    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    
    postWorkout(message: workoutP): Observable<workoutP | Number> {
        return this.http.post<workoutP | Number>(this.workoutListUrl + this.tempCurrentUserId, message, this.httpOptions);
    }

    deleteWorkout(id: number): Observable<IWorkout> {
        const currentUserId = 1
    
        return this.http.delete<IWorkout>(this.workoutDelete + currentUserId + this.secondWorkoutDelete + id, this.httpOptions).pipe(
          tap(_ => console.log(`deleted workout id=${id}`)),
          catchError(err => {
            console.log(err);
            return of();
          })
        );
    }
    deleteLift(workoutId: number, liftId: number): Observable<ILifts> {
        return this.http.delete<ILifts>(this.liftDelete + workoutId + this.secondLiftDelete + liftId, this.httpOptions).pipe(
          tap(_ => console.log(`deleted lift id=${liftId}`)),
          catchError(err => {
            console.log(err);
            return of();
          })
        );
    }
    postLift(lift: liftP, workoutId: number): Observable<liftP | Number> {
        return this.http.post<liftP | Number>(this.liftUrl + workoutId, lift, this.httpOptions);
    }
}