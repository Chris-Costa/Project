import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { catchError, EMPTY } from 'rxjs';


const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};
@Component({
  selector: 'app-azureprofile',
  templateUrl: './azureprofile.component.html',
  styleUrls: ['./azureprofile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AZUREprofileComponent implements OnInit {
  profile!: ProfileType;
  errorMessage: string;

  constructor(private http: HttpClient, private userService: UserService) { }

  activeUsers$ = this.userService.activeUser$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
          return EMPTY;
        })
    );

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }
  onSelected(weigthGoal: string): void {
    this.userService.getActiveUser(weigthGoal);
  }
}