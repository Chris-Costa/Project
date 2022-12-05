import { ChangeDetectionStrategy, Component } from '@angular/core';
import { catchError, EMPTY, map } from 'rxjs';
import { ExerciseService } from './exercise.service';
import { WorkoutTitleComponent } from '../form/workoutTitle.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-exercises',
    templateUrl: './exercise-list.component.html',
    styleUrls: ['./exercise-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseListComponent {

    constructor (private exerciseService: ExerciseService, private dialog: MatDialog){ }

    errorMessage: string;   
    success: boolean;
    
    private _listFilter: string ="";
    get listFilter(): string{
        return this._listFilter
    }
    set listFilter(value: string){
        this._listFilter = value;
        console.log('In setter', value);
        this.exercisesFilter$ = this.exerciseService.exercises$
        .pipe(
            map(exercises => 
                exercises.filter(exercise => 
                    exercise.name.toLocaleLowerCase().includes(value)
                )
            )
        );
    }
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
    newWorkout(){
        this.dialog.open(WorkoutTitleComponent, {
            width: '500px',
          });
    }
 }