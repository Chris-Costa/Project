import { Component } from "@angular/core";
import { IWorkout } from "./workout";
import { TransferService } from "./dataTransfer.service";
@Component({
    selector: 'workouts',
    templateUrl: './workoutList.component.html'
})
export class WorkoutListComponent{
    constructor (private transferService: TransferService){ }
    
    title = this.transferService.getTitleData(); 
    lifts = this.transferService.getLiftsData();
    
    check(){
        console.log(`Current title is ${this.title} and the array of workouts is... ${this.lifts[0]}, ${this.lifts[1]}, ${this.lifts[2]} `)
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