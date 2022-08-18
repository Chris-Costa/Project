import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
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
        //write this to exercise list
    }

    get listFilter(): string{
        return this._listFilter
    }
    set listFilter(value: string){
        this._listFilter = value;
        console.log('In setter', value);
        this.filteredExercises = this.performFilter(value);
    }

    filteredExercises: IExercise[] = [];

    exercises: IExercise[] = [];

    constructor (private exerciseService: ExerciseService, private transferService: TransferService, private router: Router){ }
    
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

    tempArray: string[] = [];
    arrayToSend: number[] = [];
    show: boolean = false;
    bool: boolean = true;
    
    //add name and id 
    add(id: number, name: string){
        console.log(`You clicked the button for exercise ${name} + ${id}`)
        this.tempArray.push(name);
        this.arrayToSend.push(id);
        this.show = true;
    }
    saveTitle(formValues){
        this.workoutTitle = formValues.workoutTitle
        console.log(`The title is ${this.workoutTitle}, and the selected exercises are...`)
        for (let i = 0; i<this.tempArray.length; i++){
            console.log(`${this.tempArray[i]}`)
        }
        //send workout title
        this.transferService.setTitle(this.workoutTitle);
        //send id of exercises
        this.transferService.setLifts(this.tempArray);
        //send bool
        this.transferService.setBool(this.bool);

        this.createNew = false;
        this.router.navigate(['/workoutlist'])
    }
    remove(){
        this.tempArray.pop();
        this.arrayToSend.pop();
        if (this.tempArray.length == 0){
            this.show = false;
        }
    }
    remove1(id : string){
        for (let x = 0; x < this.tempArray.length; x++){
            if (this.tempArray[x] == id){
                this.tempArray.splice(x, 1);;
            }
        }

    }
    clearDisplay(){
        //empty previous workout display
        this.tempArray.splice(0);
        //remove undo button
        this.show = false;
        //clear the real array too becasue that data should have already been sent
        this.arrayToSend.splice(0);
        //clear input field
        this.workoutTitle = ''; 
    }
 }