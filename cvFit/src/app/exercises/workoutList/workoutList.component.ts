import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ExerciseService } from "../exercise.service";
import { catchError, EMPTY } from "rxjs";
import { liftP } from "src/app/shared/workoutP";

@Component({
    selector: 'workouts',
    templateUrl: './workoutList.component.html',
    styleUrls: ['./workoutList.componet.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutListComponent {
    constructor (private exerciseService: ExerciseService){ }
    errorMessage: string = '';
    success: boolean;

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
        //console.log(workoutId, liftId);
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

        console.log(workoutId);
        let lift: liftP = {
            name: 'Test from angular'
        }
        this.exerciseService.postLift(lift, workoutId)
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