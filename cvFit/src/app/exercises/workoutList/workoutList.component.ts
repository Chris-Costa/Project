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

    //temp array 
    array: IWorkout[] = [
        {
            title: "Chest Day",
            lift: 
            [
            {
                name: "Bench Press",
                weight: 225,
                sets: 5,
                reps: 8
            },
            {
                name: "Push Ups",
                weight: "BW",
                sets: 4,
                reps: 20
            },
            {
                name: "Cable Fly",
                weight: 40,
                sets: 5,
                reps: 15
            },
            {
                name: "Landmine Press",
                weight: 90,
                sets: 4,
                reps: 12
            },
            {
                name: "Incline DB Bench Press",
                weight: 75,
                sets: 5,
                reps: 12
            }
            ]
        },
        {
            title: "Back & Biceps",
            lift: 
            [
            {
                name: "Deadlift",
                weight: 355,
                sets: 3,
                reps: 2
            },
            {
                name: "Pull Ups",
                weight: "BW",
                sets: 2,
                reps: 20
            },
            {
                name: "Lat Pulldowns",
                weight: 155,
                sets: 5,
                reps: 12
            },
            {
                name: "Cable Rows",
                weight: 115,
                sets: 4,
                reps: 15
            },
            {
                name: "Bicep Curls",
                weight: 30,
                sets: 3,
                reps: 12
            },
            {
                name: "Hammer Curls",
                weight: 30,
                sets: 3,
                reps: 12
            }
            ]
        },
        {
            title: "Sholders",
            lift: 
            [
            {
                name: "Arnold Press",
                weight: 55,
                sets: 4,
                reps: 12
            },
            {
                name: "Lateral Raises",
                weight: 15,
                sets: 3,
                reps: 15
            },
            {
                name: "Shrugs",
                weight: 95,
                sets: 3,
                reps: 10
            },
            {
                name: "Face Pulls",
                weight: 35,
                sets: 4,
                reps: 12
            },
            {
                name: "Reverse Fly",
                weight: 55,
                sets: 4,
                reps: 12
            },
            {
                name: "Front Raise",
                weight: 10,
                sets: 3,
                reps: 12
            }
            ]
        },
        {
            title: "Legs",
            lift: 
            [
            {
                name: "Hamstring Curls",
                weight: 75,
                sets: 4,
                reps: 15
            },
            {
                name: "Leg Extensions",
                weight: 125,
                sets: 5,
                reps: 15
            },
            {
                name: "RDL",
                weight: 95,
                sets: 4,
                reps: 12
            },
            {
                name: "Squats (Back)",
                weight: 315,
                sets: 4,
                reps: 4
            },
            {
                name: "Calf Raises",
                weight: 95,
                sets: 3,
                reps: 20
            },
            {
                name: "Bulgarian Split Squats",
                weight: 45,
                sets: 3,
                reps: 12
            }
            ]
        }
    
    ]
}