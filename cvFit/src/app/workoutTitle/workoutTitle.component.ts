import { Component } from "@angular/core";
import { catchError, EMPTY } from "rxjs";
import { UserService } from "../shared/user.service";
import { IWorkout } from "../shared/workout";

@Component({
    selector: 'app-workoutTitle',
    templateUrl: './workoutTitle.component.html'
})
export class WorkoutTitleComponent {
    title: string;
    errorMessage: string;   
    success: boolean;

    constructor(private userService: UserService) { }
    
    newWorkout(title: string) {  
        let workout: IWorkout = {
            azureId: 'cfc39fe5-82d4-4d2f-8889-4e13e326911f',
            title: title
        };
        this.userService.addWorkout(workout);
        this.userService.postWorkout(workout)
            .pipe(catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            }))
            .subscribe(res => {
                if(res) {
                    this.success = true;
                }
            });
    }
}