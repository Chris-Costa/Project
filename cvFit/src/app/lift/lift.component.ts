import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { catchError, EMPTY } from "rxjs";
import { UserService } from "../shared/user.service";
import { LiftAddComponent } from "../exercises/addAsLift/lift-add.component";

@Component({
    selector: 'app-lift',
    templateUrl: './lift.component.html',
    styleUrls: ['./lift.component.css'],
})
export class LiftComponent {
    errorMessage: string;
    success: boolean;

    constructor(private userService: UserService, private dialog: MatDialog) { }

    selectedWorkout$ = this.userService.selectedWorkout$
        .pipe(
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            })
    );

    currentLifts$ = this.userService.liftsWithAdd$
        .pipe(
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            })
    );    

    addNewLift(workoutId: number){
        this.dialog.open(LiftAddComponent, {
            width: '75%',
            height: '75%',
            data: {id: workoutId}
        });
    }

    deleteLift(liftId : number){
        this.userService.deleteLift(liftId)
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
}