import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, EMPTY, map, take } from 'rxjs';
import { UserService } from 'src/app/shared/user.service';
import { ILifts } from 'src/app/shared/workout';
import { ExerciseService } from '../exercise.service';

@Component({
    selector: 'app-lift-add',
    templateUrl: './lift-add.component.html',
    styleUrls: ['./lift-add.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiftAddComponent { 
    errorMessage: string;
    success: boolean;

    constructor(@Inject(MAT_DIALOG_DATA) private data: {id: number}, private exerciseService: ExerciseService, private userService: UserService) {}

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

    add(name: string){
        let lift: ILifts = {
            name: name
        }
        this.userService.postLift(lift, this.data.id)
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

        this.reload();
    }
    reload(){
        window.location.reload()
    }
}