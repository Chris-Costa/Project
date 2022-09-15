import { ChangeDetectionStrategy, Component } from '@angular/core';
import { catchError, EMPTY, map } from 'rxjs';
import { ExerciseService } from './exercise.service';
import { IWorkout } from './workoutList/workout';

@Component({
    selector: 'app-exercises',
    templateUrl: './exercise-list.component.html',
    styleUrls: ['./exercise-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseListComponent {

    constructor (private exerciseService: ExerciseService){ }
    newWorkout: IWorkout = {
        title: "",
        lift: [
        {
            name: ""
        },
        {
            name: ""
        }
    ]
    };
    workoutTitle: string = '';
    //names of exerises beig added to new workout.  Sent to another component via transfer service
    exerciseNamesForWorkout: string[] = [];
    //flag used on button click to show add feature next to each exercise and form for title entry + array of current selctions with remove buttons
    showWorkoutCreator: boolean = false;

   
    //bool sent to other component (used there in if statement) when create workout button is clicked
    createIsTrue: boolean = true;
    createNew: boolean = false;
    
    errorMessage: string;   
    
    /*
    private _title: string ="";
    get title(): string{
        return this._title
    }
    set title(val: string){
        this._title = val;
    }
    */
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
                    ))
            
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
    
    //change selected id
    onSelected(exerciseId: number): void {
        this.exerciseService.selectedExerciseChanged(exerciseId);
    }

    selectedExercise$ = this.exerciseService.selectedExercise$;
    
    //functions for creating a workout list most likely need to be replaced with observables
    create(): void{
        this.createNew = !this.createNew;
    }    
    add(name: string){
        this.exerciseNamesForWorkout.push(name);
        this.showWorkoutCreator = true;
    }
    addNewWorkout(): void {
        this.newWorkout.title = this.workoutTitle;
        for (let i = 0; i < this.exerciseNamesForWorkout.length; i++){
            this.newWorkout.lift[i].name = this.exerciseNamesForWorkout[i]
        }
        console.log('newWorkout', this.newWorkout);
        this.exerciseService.addExercise(this.newWorkout);
    }
    remove(){
        this.exerciseNamesForWorkout.pop();
        if (this.exerciseNamesForWorkout.length == 0){
            this.showWorkoutCreator = false;
        }
    }
    remove1(id : string){
        for (let x = 0; x < this.exerciseNamesForWorkout.length; x++){
            if (this.exerciseNamesForWorkout[x] == id){
                this.exerciseNamesForWorkout.splice(x, 1);;
            }
        }
    }
    clearDisplay(){
        //empty previous workout display
        this.exerciseNamesForWorkout.splice(0);
        //remove undo button
        this.showWorkoutCreator = false;
        //clear input field
        this.workoutTitle = ''; 
    }
 }