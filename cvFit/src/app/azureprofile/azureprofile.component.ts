import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const GRAPH_ENDPOINT = 'Enter_the_Graph_Endpoint_Here/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};
@Component({
  selector: 'app-azureprofile',
  templateUrl: './azureprofile.component.html',
  styleUrls: ['./azureprofile.component.css']
})
export class AZUREprofileComponent implements OnInit {
  profile!: ProfileType;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }
}