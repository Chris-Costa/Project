import { Component, Input } from "@angular/core";
import { ExerciseService } from "../exercise.service";
import { IWorkout } from "./workout";
@Component({
    selector: 'workouts',
    templateUrl: './workoutList.component.html'
})
export class WorkoutListComponent{
    constructor (public exerciseService: ExerciseService){ }
    errorMessage: string;  
    @Input() msgFromParent1: string;
    

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