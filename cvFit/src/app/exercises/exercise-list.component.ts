import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { IExercise } from './exercise';
import { ExerciseService } from './exercise.service';
import { FormControl, FormGroup } from "@angular/forms";
import { TransferService } from './workoutList/dataTransfer.service';


@Component({
    selector: 'app-exercises',
    templateUrl: './exercise-list.component.html',
    styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {
    workoutTitle: string = '';
    
    @Output() saveNewWorkout = new EventEmitter();
    
    msgToSib() { 
        this.saveNewWorkout.emit(this.saveNewWorkout)
    }
    
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

    constructor (private exerciseService: ExerciseService, private transferService: TransferService){ }
    /*
    toggleImage(): void{
        this.showImage = !this.showImage;
    }
    */
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
        //new to test
        this.transferService.setData(this.workoutTitle);
        //end new to test

        this.createNew = false;
    }
    remove(){
        this.tempArray.pop();
        this.arrayToSend.pop();
        if (this.tempArray.length == 0){
            this.show = false;
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
 /*
import { Router } from '@angular/router';
import { TransfereService } from './services/transfer.service';

export class SenderComponent implements OnInit {         
  constructor(
    private transfereService:TransfereService,
    private router:Router) {}

  somefunction(data){
   this.transfereService.setData(data);
   this.router.navigateByUrl('/reciever');//as per router
 }
}
 */