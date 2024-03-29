import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ContactUsComponent } from '../contactForm/contactUs.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  loginDisplay = false; 
  subjectSubscription: Subscription;
  progressSubscription: Subscription;

  constructor(private msalService: MsalService, private msalBroadcastService: MsalBroadcastService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.subjectSubscription = this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
      });

  
    this.progressSubscription = this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      })
  }

  setLoginDisplay(){
    this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
  }

  openDialog() {
    this.dialog.open(ContactUsComponent, {
      width: '500px',
    });
  }
  ngOnDestroy(): void {
    this.subjectSubscription.unsubscribe();
    this.progressSubscription.unsubscribe();
  }
}