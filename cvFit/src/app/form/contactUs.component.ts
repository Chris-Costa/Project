import { Component, OnInit } from "@angular/core";


@Component({
    selector: 'app-contactUs',
    templateUrl: './contactUs.component.html'
})
export class ContactUsComponent {
    firstName: any;
    lastName: any;
    email: any;
    notes: any;

    contact(formValues: any){
        console.log(formValues)
    }
}
