import { Component, OnInit } from "@angular/core";


@Component({
    selector: 'app-contactUs',
    templateUrl: './contactUs.component.html'
})
export class ContactUsComponent {

    firstName: string;
    lastName: string;
    email: string;
    notes: string;


    contact(formValues: string){
        console.log(formValues)
    }
   
    
}
