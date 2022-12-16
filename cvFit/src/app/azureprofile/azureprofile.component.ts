import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AZUREprofileComponent implements OnInit {
  profile!: ProfileType;
  errorMessage: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
            .pipe(take(1)).subscribe(profile => {
                this.profile = profile;
        });
  }
}