import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { BehaviorSubject, catchError, combineLatest, EMPTY, map } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { LiftComponent } from "src/app/lift/lift.component";
import { UserService } from "../shared/user.service";
import { HttpClient } from "@angular/common/http";
import { WorkoutTitleComponent } from "../workoutTitle/workoutTitle.component";

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};
@Component({
    selector: 'workouts',
    templateUrl: './workoutList.component.html',
    styleUrls: ['./workoutList.componet.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutListComponent implements OnInit {
    constructor (private http: HttpClient, private dialog: MatDialog, private userService: UserService){ }

    profile!: ProfileType;
    errorMessage: string;
    success: boolean;
    createNew: boolean;
    private filterSelectedSubject = new BehaviorSubject<String>('cfc39fe5-82d4-4d2f-8889-4e13e326911f');

    ngOnInit() {
        this.getProfile();
    }

    getProfile() {
        this.http.get(GRAPH_ENDPOINT)
            .subscribe(profile => {
                this.profile = profile;
            });
    }

    filterSelectedAction$ = this.filterSelectedSubject.asObservable();

    workouts$ = combineLatest([this.userService.workoutsWithAdd$, this.filterSelectedAction$])
        .pipe(
            map(([workouts, filterSelected]) =>
            workouts.filter(workout =>
                filterSelected ? workout.azureId === filterSelected : true)
            ),
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            })
    );

    createNewWorkout(){
        this.dialog.open(WorkoutTitleComponent, {
            width: '500px',
          });
    }
    deleteWorkout(id: number) {
        this.userService.deleteWorkout(id)
            .pipe(catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            }))
            .subscribe(res => {
                if(res) {
                    this.success = true;
                }
        });
    }

    delLift(workoutId: number, liftId : number){
        this.userService.deleteLift(workoutId, liftId)
            .pipe(catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            }))
            .subscribe(res => {
                if(res) {
                    this.success = true;
                }
        });
    }

    newLift(workoutId: number){
        this.createNew = true;
        this.dialog.open(LiftComponent, {
            width: '75%',
            height: '75%',
            data: {id: workoutId}
        });
    }
}