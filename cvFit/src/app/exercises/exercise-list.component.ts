import { ChangeDetectionStrategy, Component } from '@angular/core';
import { catchError, EMPTY, map } from 'rxjs';
import { ExerciseService } from './exercise.service';
import { IWorkout } from '../shared/workout';
import { workoutP } from '../shared/workoutP';
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
    
    //newWorkout: IWorkout = {title: "", lift: [{name: ""},{name: ""}]};   //type issues with undefined  current implementation only allows for two exercises per workout created
    workoutTitle: string = '';
    showWorkoutCreator: boolean = false; //bool to show array and submit field
    exerciseNamesForWorkout: string[] = [];  //hold selected workouts
    createNew: boolean = false; //bool for dispaly create workout || cancel workout
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
    addNewWorkout(): void {  
        let workout: workoutP = {
            title: this.workoutTitle,
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
    create(): void{
        this.createNew = !this.createNew;
    }    
    add(name: string){
        this.exerciseNamesForWorkout.push(name);
        this.showWorkoutCreator = true;
    }
    remove1(id : string){
        for (let x = 0; x < this.exerciseNamesForWorkout.length; x++){
            if (this.exerciseNamesForWorkout[x] == id){
                this.exerciseNamesForWorkout.splice(x, 1);;
            }
        }
    }
    clearDisplay(){
        this.exerciseNamesForWorkout.splice(0);  //empty previous workout display
        this.showWorkoutCreator = false;  //remove undo button
        this.workoutTitle = '';  //clear input field
    }
    newWorkout(){
        this.dialog.open(WorkoutTitleComponent, {
            width: '500px',
          });
    }
 }