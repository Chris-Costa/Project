import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { catchError, EMPTY, take } from "rxjs";
import { UserService } from "../shared/user.service";
import { IWorkout } from "../shared/workout";
const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  id?: string
};
@Component({
    selector: 'app-workoutTitle',
    templateUrl: './workoutTitle.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class WorkoutTitleComponent implements OnInit {
    title: string;
    errorMessage: string;   
    success: boolean;
    profile!: ProfileType;

    constructor(private userService: UserService, private http: HttpClient) { }
    
    ngOnInit() {
        this.getProfile();
    }
    
    getProfile() {
        this.http.get(GRAPH_ENDPOINT)
            .pipe(take(1)).subscribe(profile => {
                this.profile = profile;
        });
    }

    newWorkout(title: string) {  
        let workout: IWorkout = {
            azureId: this.profile.id,
            title: title
        };
        this.userService.postWorkout(workout)
            .pipe(take(1),
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            }))
            .subscribe(res => {
                this.userService.refreshStream();
                if(res) {
                    this.success = true;
                }
            });
    }
}