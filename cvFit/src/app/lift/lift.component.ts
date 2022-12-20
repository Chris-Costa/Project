import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { catchError, EMPTY, take } from "rxjs";
import { UserService } from "../shared/user.service";
import { ILifts } from "../shared/workout";
import { LiftEditComponent } from "./lift-edit.componet";

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

    constructor(private userService: UserService, private dialog: MatDialog) { }

    toggleEdit(){
        this.edit = true;
    }

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

    updateLift(liftId : number, name: string, weight: number, sets: number, reps: number){
        let lift: ILifts = {
            name: name,
            weight: weight,
            sets: sets,
            reps: reps
        }
        console.log(liftId)
        this.userService.putLift(lift, liftId)
            .pipe(take(1),
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            }))
            .subscribe(res => {
                this.userService.refreshStream();
                if(res) {
                    this.success = true;
                }
            });
    }
    
    deleteWorkout(id: number, t: boolean) {
        this.deleteMessage = t;
        this.userService.deleteWorkout(id)
            .pipe((take(1)),
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            }))
            .subscribe(res => {
                this.userService.refreshStream();
                if(res) {
                    this.success = true;
                }
            });
    }

    editLiftData(){
        this.dialog.open(LiftEditComponent, {
            width: '75%'
        });
    }

    deleteLift(liftId : number){
        this.userService.deleteLift(liftId)
            .pipe(take(1),
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            }))
            .subscribe(res => {
                if(res) {
                    this.success = true;
                }
            });
    }

    onSelectedLift(id: number): void {
        this.userService.selectedlifttChange(id);
    }
}