import { ChangeDetectionStrategy, Component } from '@angular/core';
import { catchError, EMPTY, map } from 'rxjs';
import { ExerciseService } from './exercise.service';
import { IWorkout } from '../shared/workout';

@Component({
    selector: 'app-exercises',
    templateUrl: './exercise-list.component.html',
    styleUrls: ['./exercise-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseListComponent {

    constructor (private exerciseService: ExerciseService){ }
    
    newWorkout: IWorkout = {title: "", lift: [{name: ""},{name: ""}]};   //type issues with undefined  current implementation only allows for two exercises per workout created
    workoutTitle: string = '';
    showWorkoutCreator: boolean = false; //bool to show array and submit field
    exerciseNamesForWorkout: string[] = [];  //hold selected workouts
    createNew: boolean = false; //bool for dispaly create workout || cancel workout
    errorMessage: string;   
    
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
                    exercise.exerciseName.toLocaleLowerCase().includes(value)
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
                    exercise.exerciseName.toLocaleLowerCase().includes('')
                    ))
        );
    selectedExercise$ = this.exerciseService.selectedExercise$;
    
    onSelected(exerciseId: number): void {
        this.exerciseService.selectedExerciseChanged(exerciseId);
    }
    addNewWorkout(): void {  
        this.newWorkout.title = this.workoutTitle;
        for (let i = 0; i < this.exerciseNamesForWorkout.length; i++){
            this.newWorkout.lift[i].name = this.exerciseNamesForWorkout[i]
        }
        console.log('newWorkout', this.newWorkout);
        this.exerciseService.addExercise(this.newWorkout);
        this.newWorkout = {title: "", lift: [{name: ""},{name: ""}]};   
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
 }