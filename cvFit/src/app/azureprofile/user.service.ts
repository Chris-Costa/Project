import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, combineLatest, map, merge, Observable, of, scan, Subject, tap, throwError } from "rxjs";
import { IUserData } from "../shared/user";
import { ILifts, IWorkout } from "../shared/workout";


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userUrl = 'https://localhost:7018/User';
    private userSelectionSubject = new BehaviorSubject<string>('cfc39fe5-82d4-4d2f-8889-4e13e326911f');
    private workoutInsertedSubject = new Subject<IWorkout>();
    private postWorkoutUrl = 'https://localhost:7018/Workout?userId=1';
    //temp current user id
    tempCurrentUserId: number = 1;
    private workoutURL = 'https://localhost:7018/Workout';
    

    private liftUrl = 'https://localhost:7018/Lift?workoutId=';
    private liftDelete = 'https://localhost:7018/Lift/liftId?workoutId=';
    private secondLiftDelete = '&liftId=';

    private workoutDelete = 'https://localhost:7018/Workout/workoutId?userId=';
    private secondWorkoutDelete = '&workoutId=';

    constructor(private http: HttpClient) { }

    users$ = this.http.get<IUserData[]>(this.userUrl).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))), 
        catchError(this.handleError)
    );
     
    workouts$ = this.http.get<IWorkout[]>(this.postWorkoutUrl).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))), 
        catchError(this.handleError)
    );
    userSelected$ = this.userSelectionSubject.asObservable();

    activeUser$ = combineLatest([
        this.users$,
        this.userSelected$
    ]).pipe(
        map(([users, selectedUserAzureId]) =>
            users.find(user => user.azureId === selectedUserAzureId)
        ),
        tap(user => console.log('activeUser', user))
    )

    getActiveUser(selectedUserAzureId: string): void {
        this.userSelectionSubject.next(selectedUserAzureId);
    }

    workoutInsertedAction$ = this.workoutInsertedSubject.asObservable();
    
    workoutsOfCurrentUser$ = this.activeUser$ //observable of the currently selected user workouts
        .pipe(
            map(user => user.workout),
            tap(data => console.log('workouts', JSON.stringify(data))),
            catchError(this.handleError)
    );
    
    workoutsWithAdd$ = merge(this.workouts$, this.workoutInsertedAction$)
        .pipe(
            scan((acc, value) =>
            (value instanceof Array) ? [...value]: [...acc, value], [] as IWorkout[])
    );

    addWorkout(newWorkout: IWorkout) { //function to add new workout in component
        this.workoutInsertedSubject.next(newWorkout)
    }
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    postWorkout(message: IWorkout): Observable<IWorkout | Number> {
        return this.http.post<IWorkout | Number>(this.postWorkoutUrl, message, this.httpOptions);
    } 
    
    

    

    /*
    //observable for pre-existing workouts
    workouts$ = this.http.get<IWorkout[]>(this.workoutListUrl + this.tempCurrentUserId).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))), 
        catchError(this.handleError)
    );
    //add new workout to list
   */
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
    //httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    /*
    postWorkout(message: workoutP): Observable<workoutP | Number> {
        return this.http.post<workoutP | Number>(this.workoutListUrl + this.tempCurrentUserId, message, this.httpOptions);
    }
*/
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
    postLift(lift: ILifts, workoutId: number): Observable<ILifts | Number> {
        return this.http.post<ILifts | Number>(this.liftUrl + workoutId, lift, this.httpOptions);
    }
}