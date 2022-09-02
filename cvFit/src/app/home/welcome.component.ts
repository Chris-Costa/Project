import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactUsComponent } from '../form/contactUs.component';


@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(ContactUsComponent, {
      width: '500px',
    });
  }
}
 

