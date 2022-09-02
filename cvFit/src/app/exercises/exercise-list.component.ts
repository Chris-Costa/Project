import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IExercise } from './exercise';
import { ExerciseService } from './exercise.service';
import { TransferService } from './workoutList/dataTransfer.service';

@Component({
    selector: 'app-exercises',
    templateUrl: './exercise-list.component.html',
    styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {

    constructor (private exerciseService: ExerciseService, private transferService: TransferService, private router: Router){ }
    
    filteredExercises: IExercise[] = [];
    exercises: IExercise[] = [];
    //names of exerises beig added to new workout.  Sent to another component via transfer service
    exerciseNamesForWorkout: string[] = [];
    //flag used on button click to show add feature next to each exercise and form for title entry + array of current selctions with remove buttons
    showWorkoutCreator: boolean = false;
    //bool sent to other component (used there in if statement) when create workout button is clicked
    createIsTrue: boolean = true;
    workoutTitle: string = '';
    private _listFilter: string ="";
    errorMessage: string;   
    createNew: boolean = false;
    private _title: string ="";


    get title(): string{
        return this._title
    }
    set title(val: string){
        this._title = val;
    }

    get listFilter(): string{
        return this._listFilter
    }
    set listFilter(value: string){
        this._listFilter = value;
        console.log('In setter', value);
        this.filteredExercises = this.performFilter(value);
    }
    
    ngOnInit(): void{
        this.exerciseService.getExercises().subscribe({
            next: exercises => {
                this.exercises = exercises;
                this.filteredExercises = this.exercises;
            },
            error: err => this.errorMessage = err
        });
    }
    performFilter(filterBy: string): IExercise[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.exercises.filter((exercise: IExercise) =>
            exercise.exerciseName.toLocaleLowerCase().includes(filterBy))
    }
    create(): void{
        this.createNew = !this.createNew;
    }    

    add(name: string){
        this.exerciseNamesForWorkout.push(name);
        this.showWorkoutCreator = true;
    }
    saveTitle(formValues){
        this.workoutTitle = formValues.workoutTitle
        console.log(`The title is ${this.workoutTitle}, and the selected exercises are...`)
        for (let i = 0; i<this.exerciseNamesForWorkout.length; i++){
            console.log(`${this.exerciseNamesForWorkout[i]}`)
        }
        //send workout title
        this.transferService.setTitle(this.workoutTitle);
        //send names of exercises
        this.transferService.setLifts(this.exerciseNamesForWorkout);
        //send bool
        this.transferService.setBool(this.createIsTrue);

        this.createNew = false;
        this.router.navigate(['/workoutlist'])
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