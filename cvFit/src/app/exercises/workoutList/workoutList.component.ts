import { Component } from "@angular/core";
import { ExerciseService } from "../exercise.service";
import { catchError, EMPTY } from "rxjs";

@Component({
    selector: 'workouts',
    templateUrl: './workoutList.component.html',
    styleUrls: ['./workoutList.componet.css']
})
export class WorkoutListComponent {
    constructor (private exerciseService: ExerciseService){ }
    errorMessage: string = '';
    
    workouts$ = this.exerciseService.workoutsWithAdd$
        .pipe(catchError(err => {
            this.errorMessage = err;
            return EMPTY;
        }));
}