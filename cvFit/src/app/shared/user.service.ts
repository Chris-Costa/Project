import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, combineLatest, map, merge, Observable, of, scan, Subject, tap, throwError } from "rxjs";
import { ILifts, IWorkout } from "./workout";


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private workoutInsertedSubject = new Subject<IWorkout>();
    private workoutUrl = 'https://localhost:7018/Workout/';
    private deleteWorkoutUrl = 'https://localhost:7018/Workout/workoutId?workoutId=';
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    private workoutSelectionSubject = new BehaviorSubject<number>(0);
    private workoutDeleteSelectionSubject = new BehaviorSubject<number>(0);
    private liftInsertedSubject = new Subject<ILifts>();
    private liftUrl = 'https://localhost:7018/Lift?workoutId=';


    private liftDelete = 'https://localhost:7018/Lift/liftId?liftId=';
    

    constructor(private http: HttpClient) { }
     
    workouts$ = this.http.get<IWorkout[]>(this.workoutUrl).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))), 
        catchError(this.handleError)
    );

    workoutInsertedAction$ = this.workoutInsertedSubject.asObservable();
    
    workoutsWithAdd$ = merge(this.workouts$, this.workoutInsertedAction$)
        .pipe(
            scan((acc, value) =>
            (value instanceof Array) ? [...value]: [...acc, value], [] as IWorkout[])
    );

    workoutSelectionAction$ = this.workoutSelectionSubject.asObservable();

    selectedWorkout$ = combineLatest([this.workouts$, this.workoutSelectionAction$])
        .pipe(
            map(([workouts, selectedWorkoutId]) => 
                workouts.find(workout => workout.id === selectedWorkoutId)),
            tap(workout => console.log('selected workout', workout))
    );

    liftInsertedAction$ = this.liftInsertedSubject.asObservable();
    
    liftsOfCurrentPost$ = this.selectedWorkout$ 
        .pipe(
            map(workout => workout.lift),
            tap(data => console.log('lifts', JSON.stringify(data))),
            catchError(this.handleError)
    );

    liftsWithAdd$ = merge(this.liftsOfCurrentPost$, this.liftInsertedAction$)
        .pipe(
            scan((acc, value) =>
            (value instanceof Array) ? [...value]: [...acc, value], [] as ILifts[])
    );

    workoutDeleteSelectionAction$ = this.workoutDeleteSelectionSubject.asObservable();

    combinedLifts$ = combineLatest([this.workoutsWithAdd$, this.workoutDeleteSelectionAction$])
            .pipe(map(([workouts, selectedWorkoutId]) =>
            workouts.find(workout => workout.id !== selectedWorkoutId)),
            tap(workout => console.log()))

    selectedWorkoutChange(selectedWorkoutId: number): void{ 
        this.workoutDeleteSelectionSubject.next(selectedWorkoutId);
        console.log('selected post id ', this.workoutSelectionSubject.value);
    }

    addWorkout(newWorkout: IWorkout) { 
        this.workoutInsertedSubject.next(newWorkout)
    }
    
    postWorkout(message: IWorkout): Observable<IWorkout | Number> {
        return this.http.post<IWorkout | Number>(this.workoutUrl, message, this.httpOptions);
    }

    removeWorkout(id: number){
        this.workoutDeleteSelectionSubject.next(id);
        console.log('selected post id ', this.workoutDeleteSelectionSubject.value);
    }

    deleteWorkout(id: number): Observable<IWorkout> {
        return this.http.delete<IWorkout>(this.deleteWorkoutUrl + id, this.httpOptions)
            .pipe(tap(_ => console.log(`deleted workout id=${id}`)),
                catchError(err => {
                    console.log(err);
                    return of();
                })
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
   
    deleteLift(liftId: number): Observable<ILifts> {
        return this.http.delete<ILifts>(this.liftDelete + liftId, this.httpOptions).pipe(
          tap(_ => console.log(`deleted lift id=${liftId}`)),
          catchError(err => {
            console.log(err);
            return of();
          })
        );
    }
    postLift(lift: ILifts, workoutId: number): Observable<ILifts | Number> {
        return this.http.post<ILifts | Number>(this.liftUrl + workoutId , lift, this.httpOptions);
    }

    addLift(newLift: ILifts) { 
        this.liftInsertedSubject.next(newLift);
    }
}