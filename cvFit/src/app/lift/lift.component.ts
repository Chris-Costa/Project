import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { catchError, EMPTY } from "rxjs";
import { UserService } from "../shared/user.service";
import { LiftAddComponent } from "../exercises/addAsLift/lift-add.component";
import { Router } from "@angular/router";

@Component({
    selector: 'app-lift',
    templateUrl: './lift.component.html',
    styleUrls: ['./lift.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class LiftComponent {
    errorMessage: string;
    success: boolean;
    deleteMessage: boolean = false;

    constructor(private userService: UserService, private dialog: MatDialog, private router: Router) { }

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

    deleteWorkout(id: number, t: boolean) {
        this.deleteMessage = t;
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
}