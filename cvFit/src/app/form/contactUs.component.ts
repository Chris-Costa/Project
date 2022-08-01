import { Component, OnInit } from "@angular/core";


@Component({
    selector: 'app-contactUs',
    templateUrl: './contactUs.component.html'
})
export class ContactUsComponent {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    notes: string | undefined;

    contact(formValues: string){
        console.log(formValues)
    }
}
