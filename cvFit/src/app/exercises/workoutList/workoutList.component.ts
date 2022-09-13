import { Component } from "@angular/core";
import { ILifts, IWorkout } from "./workout";
import { TransferService } from "./dataTransfer.service";
import { ExerciseService } from "../exercise.service";
import { catchError, EMPTY } from "rxjs";


@Component({
    selector: 'workouts',
    templateUrl: './workoutList.component.html',
    styleUrls: ['./workoutList.componet.css']
})
export class WorkoutListComponent {
    constructor (private transferService: TransferService, private exerciseService: ExerciseService){ }
    errorMessage: string = '';
    workouts$ = this.exerciseService.workouts$
        .pipe(
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            })
        );
   
    //new workouts title 
    title: string = this.transferService.getTitleData(); 
    //name of exercises to be added to the new workout
    lifts: string[] = this.transferService.getLiftsData();
    newWorkout: boolean = this.transferService.getBool();
    
    //temp arrray to create 
    newArr: ILifts[] = [];

}