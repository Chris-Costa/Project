import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup;
   
    constructor(private router: Router, private authService: AuthService){ }

    ngOnInit(): void {
        let firstName = new FormControl(this.authService.currentUser.firstName);
        let lastName = new FormControl(this.authService.currentUser.lastName);
        let avatar = new FormControl(this.authService.currentUser.avatar);
        let goal = new FormControl(this.authService.currentUser.goal);
        this.profileForm = new FormGroup({
            firstName: firstName,
            lastName: lastName,
            avatar: avatar,
            goal: goal
        })
    }
    cancel(){
        this.router.navigate(['welcome']);
    }
    saveProfile(formValue){
        this.authService.updateCurrentUser(formValue.firstName, formValue.lastName, formValue.avatar, formValue.goal);
        console.log(formValue)
    }
}