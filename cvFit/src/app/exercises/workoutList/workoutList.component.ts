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
                this.newArr.push({name: this.lifts[i], weight: undefined, sets: undefined, reps: undefined})
            }
            this.array.push({title: this.title, lift: this.newArr})
        }
    }

    //test inputs for weight, set, reps.  currently logging to console for bench press and rdls
    //dummy button created
    checkInputs(){
        console.log(`Current values for chest day bench press...${this.array[0].lift[0].weight}, ${this.array[0].lift[0].sets}, ${this.array[0].lift[0].reps} `);
        console.log(`Current values for chest day bench press...${this.array[3].lift[1].weight}, ${this.array[3].lift[1].sets}, ${this.array[3].lift[1].reps} `)
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
                    weight: undefined,
                    sets: undefined,
                    reps: undefined
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
                    weight: undefined,
                    sets: undefined,
                    reps: undefined
                },
                {
                    name: "Deadlifts",
                    weight: undefined,
                    sets: undefined,
                    reps: undefined
                }
            ]
        },
        {
            title: "Sholders",
            lift: [
                {
                    name: "Arnold Press",
                    weight: undefined,
                    sets: undefined,
                    reps: undefined
                },
                {
                    name: "Lateral Raises",
                    weight: undefined,
                    sets: undefined,
                    reps: undefined
                }
            ]
        },
        {
            title: "Legs",
            lift: [
                {
                    name: "Squat (Back)",
                    weight: undefined,
                    sets: undefined,
                    reps: undefined
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