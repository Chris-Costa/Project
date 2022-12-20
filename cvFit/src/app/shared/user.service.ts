import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, combineLatest, map, merge, mergeMap, Observable, of, scan, shareReplay, Subject, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ILifts, IWorkout } from "./workout";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private workoutUrl = environment.baseUrl + 'Workout/';
    private liftUrl = environment.baseUrl + 'Lift?workoutId=';

    private deleteWorkoutUrl = environment.baseUrl + 'Workout/workoutId?workoutId=';
    private liftDelete = environment.baseUrl + 'Lift/liftId?liftId=';
    
    private liftPutUrl = environment.baseUrl + 'Lift/';
    private liftAllUrl = environment.baseUrl + 'Lift';
    
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    private workoutSelectionSubject = new BehaviorSubject<number>(0);
    private workoutInsertedSubject = new Subject<IWorkout>();
    private liftSelectionSubject = new BehaviorSubject<number>(0)
    private liftInsertedSubject = new Subject<ILifts>();

    private _workoutData$ = new BehaviorSubject<void>(undefined);

    private _liftData$ = new BehaviorSubject<void>(undefined);

    
    constructor(private http: HttpClient) { }

    workouts$ = this.http.get<IWorkout[]>(this.workoutUrl).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))), 
        catchError(this.handleError)
    );
    
    workout$ = this._workoutData$.pipe(
        mergeMap(() => this.workouts$),
        shareReplay(1)
    );

    workoutInsertedAction$ = this.workoutInsertedSubject.asObservable();
    
    workoutsWithAdd$ = merge(this.workout$, this.workoutInsertedAction$)
        .pipe(
            scan((acc, value) =>
            (value instanceof Array) ? [...value]: [...acc, value], [] as IWorkout[])
    );

    workoutSelectionAction$ = this.workoutSelectionSubject.asObservable();

    selectedWorkout$ = combineLatest([this.workout$, this.workoutSelectionAction$])
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


    refreshStream(){
        this._workoutData$.next();

    lifts$ = this.http.get<ILifts[]>(this.liftAllUrl).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))), 
        catchError(this.handleError)
    );

    lift$ = this._liftData$.pipe(
        mergeMap(() => this.lifts$),
        shareReplay(1)
    );

    liftSelectionAction$ = this.liftSelectionSubject.asObservable();

    selectedLift$ = combineLatest([this.lift$, this.liftSelectionAction$])
        .pipe(
            map(([lifts, selectedLiftId]) => 
                lifts.find(lift => lift.id === selectedLiftId)),
            tap(lift => console.log('selected lift', lift))
    );

    refreshLiftStream(){
        this._liftData$.next();

    }

    selectedWorkoutChange(selectedWorkoutId: number): void{ 
        this.workoutSelectionSubject.next(selectedWorkoutId);
        console.log('selected post id ', this.workoutSelectionSubject.value);
    }

    postWorkout(newWorkout: IWorkout): Observable<IWorkout | Number> {
        this.workoutInsertedSubject.next(newWorkout);
        return this.http.post<IWorkout | Number>(this.workoutUrl, newWorkout, this.httpOptions);
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

    selectedlifttChange(selectedLifttId: number): void{ 
        this.liftSelectionSubject.next(selectedLifttId);
        console.log('selected lift id ', this.liftSelectionSubject.value);
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
        this.liftInsertedSubject.next(lift);
        return this.http.post<ILifts | Number>(this.liftUrl + workoutId , lift, this.httpOptions);
    }
}