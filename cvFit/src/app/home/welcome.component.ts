import { MatDialog } from '@angular/material/dialog';
import { ContactUsComponent } from '../form/contactUs.component';
import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private msalService: MsalService, private msalBroadcastService: MsalBroadcastService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
      });
  }
  
  openDialog() {
    this.dialog.open(ContactUsComponent, {
      width: '500px',
    });
  }
}