import { Component } from "@angular/core";
import { catchError, EMPTY } from "rxjs";
import { ContactUs } from "../shared/contactUs";
import { ContactUsService } from './contactUs.service';

@Component({
    selector: 'app-contactUs',
    templateUrl: './contactUs.component.html'
})
export class ContactUsComponent {

    firstName: string;
    lastName: string;
    email: string;
    notes: string;
    errorMessage: string;
    success: boolean;

    constructor(private contactUsService: ContactUsService) { }

    contactUsUrl = 'https://localhost:7018/ContactUs/';

    contact(firstName: string, lastName: string, email: string, notes: string){
        
        let contact: ContactUs = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            notes: notes
        };
        this.contactUsService.postMessage(contact)
            .pipe(catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            }))
            .subscribe(res => {
                if(res) {
                    this.success = true;
                }
            });
    }
}