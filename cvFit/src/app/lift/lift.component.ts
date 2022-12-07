import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { catchError, EMPTY, map } from "rxjs";
import { ExerciseService } from "../exercises/exercise.service";
import { liftP } from "../shared/workoutP";

@Component({
    selector: 'app-lift',
    templateUrl: './lift.component.html',
    styleUrls: ['./lift.component.css'],
})
export class LiftComponent {
    errorMessage: string;
    success: boolean;

    constructor(@Inject(MAT_DIALOG_DATA) private data: {id: number}, private exerciseService: ExerciseService) { }

    //new async observables
    exercises$ = this.exerciseService.exercises$
        .pipe(
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            })
        );
    exercisesFilter$ = this.exerciseService.exercises$
        .pipe(
            map(exercises => 
                exercises.filter(exercise => 
                    exercise.name.toLocaleLowerCase().includes('')
                    ))
        );

    selectedExercise$ = this.exerciseService.selectedExercise$;
    
    onSelected(exerciseId: number): void {
        this.exerciseService.selectedExerciseChanged(exerciseId);
    }
    
    add(name: string){
        let lift: liftP = {
            name: name
        }
        this.exerciseService.postLift(lift, this.data.id)
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