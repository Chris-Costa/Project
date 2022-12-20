import { ChangeDetectionStrategy, Component } from "@angular/core";
import { catchError, EMPTY, take } from "rxjs";
import { UserService } from "../shared/user.service";
import { ILifts } from "../shared/workout";


@Component({
    selector: 'app-lift-edit',
    templateUrl: './lift-edit.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class LiftEditComponent {
    errorMessage: string;
    success: boolean;
    deleteLift: boolean = false;

    constructor(private userService: UserService) {}

    lift$ = this.userService.selectedLift$.pipe(
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
                this.userService.refreshLiftStream();
                this.userService.refreshStream();
                    if(res) {
                    this.success = true;
                }
            });
    }
} 