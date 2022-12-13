import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { catchError, EMPTY } from "rxjs";
import { UserService } from "../shared/user.service";
import { LiftAddComponent } from "../exercises/addAsLift/lift-add.component";
import { Router } from "@angular/router";
import { ILifts } from "../shared/workout";

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
    edit: boolean = false;
    toggleEdit(){
        this.edit = true;
    }

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

    updateLift(liftId : number){
        let lift: ILifts = {
            weight: 50,
            sets: 50,
            reps: 50
        }
        console.log(liftId)
        this.userService.putLift(lift, liftId)
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