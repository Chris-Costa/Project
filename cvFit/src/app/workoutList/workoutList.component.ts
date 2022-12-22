import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { catchError, delay, EMPTY, map, take } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "../shared/user.service";
import { WorkoutTitleComponent } from "../workoutTitle/workoutTitle.component";
import { LiftAddComponent } from "../exercises/addAsLift/lift-add.component";
import { HttpClient } from "@angular/common/http";
import { ExerciseService } from "../exercises/exercise.service";

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  id?: string
};

@Component({
    selector: 'workouts',
    templateUrl: './workoutList.component.html',
    styleUrls: ['./workoutList.componet.css'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class WorkoutListComponent implements OnInit {
    constructor (private dialog: MatDialog, private userService: UserService, private exerciseService: ExerciseService, private http: HttpClient){ }

    profile!: ProfileType;
    errorMessage: string;
    success: boolean;
    deleteMessage: boolean = false;

    ngOnInit() {
        this.getProfile();
        
    }
    getProfile() {
        this.http.get(GRAPH_ENDPOINT)
            .pipe(take(1)).subscribe(profile => {
                this.profile = profile;
        });
    }

    workouts$ = this.userService.workoutsWithAdd$
            .pipe(delay(500),
                map(workouts => workouts.filter(workout =>
                    workout.azureId === this.profile.id)
                ),
                catchError(err => {
                    this.errorMessage = err;
                    return EMPTY;
                })
        );
    
    onSelected(workoutId: number): void{
        this.userService.selectedWorkoutChange(workoutId);
    }

    onSelectedExercise(exerciseName: string): void {
        this.exerciseService.selectedExerciseChangedString(exerciseName);
    }
    
    createNewWorkout(){
        this.dialog.open(WorkoutTitleComponent, {
            width: '500px',
        });
    }

    addLift(workoutId: number){
        this.dialog.open(LiftAddComponent, {
            width: '50%',
            height: '50%',
            data: {id: workoutId}
        })
    }

    deleteWorkout(id: number, t: boolean) {
        this.deleteMessage = t;
        this.userService.deleteWorkout(id)
            .pipe(take(1),
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            }))
            .subscribe(res => {
                this.userService.refreshWorkoutStream();
                if(res) {
                    this.success = true;
                }
            });
    }
}