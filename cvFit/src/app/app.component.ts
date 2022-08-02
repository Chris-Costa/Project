import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './form/auth.service';
import { ProfileComponent } from './form/profile.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth:AuthService, public dialog: MatDialog) {}
  
  openDialog() {
    this.dialog.open(ProfileComponent, {
      width: '500px',
    });
  }

}
