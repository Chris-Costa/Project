import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, combineLatest, map, merge, Observable, of, scan, Subject, tap, throwError } from "rxjs";
import { ILifts, IWorkout } from "./workout";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private workoutUrl = 'https://localhost:7018/Workout/';
    private deleteWorkoutUrl = 'https://localhost:7018/Workout/workoutId?workoutId=';
    private liftUrl = 'https://localhost:7018/Lift?workoutId=';
    private liftPutUrl = 'https://localhost:7018/Lift/';
    private liftDelete = 'https://localhost:7018/Lift/liftId?liftId=';
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    private workoutSelectionSubject = new BehaviorSubject<number>(0);
    private workoutInsertedSubject = new Subject<IWorkout>();
    private liftInsertedSubject = new Subject<ILifts>();
    
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

    selectedWorkout$ = combineLatest([this.workoutsWithAdd$, this.workoutSelectionAction$])
        .pipe(
            map(([workouts, selectedWorkoutId]) => 
                workouts.find(workout => workout.id === selectedWorkoutId)),
            tap(workout => console.log('selected workout', workout))
    );

    liftInsertedAction$ = this.liftInsertedSubject.asObservable();
    
    liftsOfCurrentWorkout$ = this.selectedWorkout$ 
        .pipe(
            map(workout => workout.lift),
            tap(data => console.log('lifts', JSON.stringify(data))),
            catchError(this.handleError)
    );

    liftsWithAdd$ = merge(this.liftsOfCurrentWorkout$, this.liftInsertedAction$)
        .pipe(
            scan((acc, value) =>
            (value instanceof Array) ? [...value]: [...acc, value], [] as ILifts[])
    );

    selectedWorkoutChange(selectedWorkoutId: number): void{ 
        this.workoutSelectionSubject.next(selectedWorkoutId);
        console.log('selected post id ', this.workoutSelectionSubject.value);
    }

    addWorkout(newWorkout: IWorkout) { 
        this.workoutInsertedSubject.next(newWorkout);
    }
    
    postWorkout(message: IWorkout): Observable<IWorkout | Number> {
        return this.http.post<IWorkout | Number>(this.workoutUrl, message, this.httpOptions);
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

    putLift(lift: ILifts, liftId: number): Observable<ILifts | Number>{
        return this.http.put<ILifts | Number>(this.liftPutUrl + liftId, lift, this.httpOptions)
            .pipe(
                catchError(err => {
                    console.log(err);
                    return of();
                })
            );
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