import { Component, OnInit } from "@angular/core";
import { IWorkout } from "./workout";
import { TransferService } from "./dataTransfer.service";
import { ExerciseService } from "../exercise.service";
import { ILifts } from "./lifts";

@Component({
    selector: 'workouts',
    templateUrl: './workoutList.component.html',
    styleUrls: ['./workoutList.componet.css']
})
export class WorkoutListComponent implements OnInit{
    constructor (private transferService: TransferService, private exerciseService: ExerciseService){ }
   
    title: string = this.transferService.getTitleData(); 
    lifts: string[] = this.transferService.getLiftsData();
    newWorkout: boolean = this.transferService.getBool();

    /*For the json http
    exercises: IWorkout[] = [];
    errorMessage: string = '';
    */
   //create array to push
    newArr: ILifts[] = [];

    ngOnInit(): void {
        
        /*json http
        this.exerciseService.getWL().subscribe({
            next: exercises => {
                this.exercises = exercises;
            },
            error: err => this.errorMessage = err
        }); 
        */
        if (this.newWorkout){
            for (let i = 0; i < this.lifts.length; i++){
                this.newArr.push({name: this.lifts[i], weight: 0, sets: 0, reps: 0})
            }
            this.array.push({title: this.title, lift: this.newArr})
        }
    }
    //temp array 
    array: IWorkout[] = [
        {
            title: "Chest Day",
            lift: [
                {
                    name: "Bench Press",
                    weight: 0,
                    sets: 0,
                    reps: 0
                },
                {
                    name: "Push Ups",
                    weight: 0,
                    sets: 0,
                    reps: 0
                },
                {
                    name: "Landmine Press",
                    weight: undefined,
                    sets: undefined,
                    reps: undefined
                }
            ]
        },
        {
            title: "Back & Biceps",
            lift: [
                {
                    name: "Lat Pulldowns",
                    weight: 0,
                    sets: 0,
                    reps: 0
                },
                {
                    name: "Deadlifts",
                    weight: 0,
                    sets: 0,
                    reps: 0
                }
            ]
        },
        {
            title: "Sholders",
            lift: [
                {
                    name: "Arnold Press",
                    weight: 0,
                    sets: 0,
                    reps: 0
                },
                {
                    name: "Lateral Raises",
                    weight: 0,
                    sets: 0,
                    reps: 0
                }
            ]
        },
        {
            title: "Legs",
            lift: [
                {
                    name: "Squat (Back)",
                    weight: 0,
                    sets: 0,
                    reps: 0
                },
                {
                    name: "RDL",
                    weight: 0,
                    sets: 0,
                    reps: 0
                }
            ]
        }
    ]
}