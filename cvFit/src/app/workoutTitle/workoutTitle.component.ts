import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { catchError, EMPTY } from "rxjs";
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
          .subscribe(profile => {
            this.profile = profile;
        });
    }

    newWorkout(title: string) {  
        let workout: IWorkout = {
            azureId: this.profile.id,
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
    reloadPage(){
        window.location.reload()
    }
}