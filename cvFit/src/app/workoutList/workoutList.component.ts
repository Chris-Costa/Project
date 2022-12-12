import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BehaviorSubject, catchError, combineLatest, EMPTY, map } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "../shared/user.service";
import { WorkoutTitleComponent } from "../workoutTitle/workoutTitle.component";

@Component({
    selector: 'workouts',
    templateUrl: './workoutList.component.html',
    styleUrls: ['./workoutList.componet.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutListComponent {
    constructor (private dialog: MatDialog, private userService: UserService){ }

    errorMessage: string;
    success: boolean;
    private filterSelectedSubject = new BehaviorSubject<String>('cfc39fe5-82d4-4d2f-8889-4e13e326911f'); //temp hardcode azureid string

    filterSelectedAction$ = this.filterSelectedSubject.asObservable();

    workouts$ = combineLatest([this.userService.workoutsWithAdd$, this.filterSelectedAction$])
        .pipe(
            map(([workouts, filterSelected]) =>
            workouts.filter(workout =>
                filterSelected ? workout.azureId === filterSelected : true)
            ),
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            })
    );

    onSelected(workoutId: number): void{
        this.userService.selectedWorkoutChange(workoutId);
    }
    createNewWorkout(){
        this.dialog.open(WorkoutTitleComponent, {
            width: '500px',
          });
    }
    deleteWorkout(id: number) {
        //this.userService.removeWorkout(id);
        this.userService.deleteWorkout(id)
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

