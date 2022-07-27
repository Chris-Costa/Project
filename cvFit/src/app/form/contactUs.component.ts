import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'app-contactUs',
    templateUrl: './contactUs.component.html'
})
export class ContactUsComponent {
    firstName: any;
    lastName: any;
    email: any;
    notes: any;

    constructor(private router:Router){ }

    contact(formValues: any){
        console.log(formValues)
    }
    back(){
        this.router.navigate(['welcome']);
    }
}
