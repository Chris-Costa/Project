import { ChangeDetectionStrategy, Component } from "@angular/core";
import { catchError, EMPTY } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { LiftComponent } from "src/app/lift/lift.component";
import { UserService } from "../azureprofile/user.service";

@Component({
    selector: 'workouts',
    templateUrl: './workoutList.component.html',
    styleUrls: ['./workoutList.componet.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutListComponent {
    constructor (private dialog: MatDialog, private userService: UserService){ }
    errorMessage: string = '';
    success: boolean;
    createNew: boolean;

    currentUser$ = this.userService.activeUser$
        .pipe(catchError(err => {
            this.errorMessage = err;
            return EMPTY;
        }))
    workouts$ = this.userService.workoutsWithAdd$
        .pipe(catchError(err => {
            this.errorMessage = err;
            return EMPTY;
        }))

    onSelected(id: number){
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