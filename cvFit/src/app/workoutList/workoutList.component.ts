import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ExerciseService } from "../exercises/exercise.service";
import { catchError, EMPTY } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { LiftComponent } from "src/app/lift/lift.component";

@Component({
    selector: 'workouts',
    templateUrl: './workoutList.component.html',
    styleUrls: ['./workoutList.componet.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutListComponent {
    constructor (private exerciseService: ExerciseService, private dialog: MatDialog){ }
    errorMessage: string = '';
    success: boolean;
    createNew: boolean;

    workouts$ = this.exerciseService.workoutsWithAdd$
        .pipe(catchError(err => {
            this.errorMessage = err;
            return EMPTY;
            })
        );    

    onSelected(id: number){
        this.exerciseService.deleteWorkout(id)
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
        this.exerciseService.deleteLift(workoutId, liftId)
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