import { Component } from "@angular/core";
import { catchError, EMPTY } from "rxjs";
import { ExerciseService } from "../exercises/exercise.service";
import { workoutP } from "../shared/workoutP";

@Component({
    selector: 'app-workoutTitle',
    templateUrl: './workoutTitle.component.html'
})
export class WorkoutTitleComponent {
    title: string;
    errorMessage: string;   
    success: boolean;

    constructor(private exerciseService: ExerciseService) { }
    
    addNewWorkout(title: string): void {  
        let workout: workoutP = {
            title: title,
            lift: []
        };
        this.exerciseService.postWorkout(workout)
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