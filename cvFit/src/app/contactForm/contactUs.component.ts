import { Component } from "@angular/core";
import { catchError, EMPTY, take } from "rxjs";
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

    contact(firstName: string, lastName: string, email: string, notes: string){
        let contact: ContactUs = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            notes: notes
        };
        this.contactUsService.postMessage(contact)
            .pipe(take(1),
            catchError(err => {
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