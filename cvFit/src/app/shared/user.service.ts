import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, combineLatest, map, merge, Observable, of, scan, Subject, tap, throwError } from "rxjs";
import { IUserData } from "./user";
import { ILifts, IWorkout } from "./workout";


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private workoutInsertedSubject = new Subject<IWorkout>();
    private workoutUrl = 'https://localhost:7018/Workout/';
    private deleteWorkoutUrl = 'https://localhost:7018/Workout/workoutId?workoutId=';
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    
    

    private liftUrl = 'https://localhost:7018/Lift?workoutId=';
    private liftDelete = 'https://localhost:7018/Lift/liftId?workoutId=';
    private secondLiftDelete = '&liftId=';

    private workoutDelete = 'https://localhost:7018/Workout/workoutId?userId=';
    private secondWorkoutDelete = '&workoutId=';

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

    addWorkout(newWorkout: IWorkout) { 
        this.workoutInsertedSubject.next(newWorkout)
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
   
    deleteLift(workoutId: number, liftId: number): Observable<ILifts> {
        return this.http.delete<ILifts>(this.liftDelete + workoutId + this.secondLiftDelete + liftId, this.httpOptions).pipe(
          tap(_ => console.log(`deleted lift id=${liftId}`)),
          catchError(err => {
            console.log(err);
            return of();
          })
        );
    }
    postLift(lift: ILifts, workoutId: number): Observable<ILifts | Number> {
        return this.http.post<ILifts | Number>(this.liftUrl + workoutId, lift, this.httpOptions);
    }
}