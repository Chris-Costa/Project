import { Component, Input, OnInit } from "@angular/core";
import { ExerciseService } from "../exercise.service";
import { IWorkout } from "./workout";
import { TransferService } from "./dataTransfer.service";
@Component({
    selector: 'workouts',
    templateUrl: './workoutList.component.html'
})
export class WorkoutListComponent{
    constructor (public exerciseService: ExerciseService, private transferService: TransferService){ }
    errorMessage: string;  
    @Input() msgFromParent1: string;
    data = this.transferService.getData(); 
    
    check(){
        console.log(`Current title is ${this.data} and the array of workouts is...`)
    }

    workouts: IWorkout[] = [
        {
            title: "Chest Day",
            lifts: ['Bench Press', 'Dumbell Incline Press', 'PushUps']
        },
        {
            title: "Leg Day (Quad Dominant)",
            lifts: ['Bench Press', 'Dumbell Incline Press', 'PushUps']
        },
        {
            title: "Back and Biceps",
            lifts: ['Bench Press', 'Dumbell Incline Press', 'PushUps']
        },
        {
            title: "Sholders",
            lifts: ['Arnold Press', 'Dumbell Incline Press', 'PushUps']
        }
    ]
}