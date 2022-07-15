import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ContactUs } from "./contactUs";

@Component({
    selector: 'app-contactUs',
    templateUrl: './contactUs.component.html'
})
export class ContactUsComponent implements OnInit{
    contactUs = new ContactUs();
    constructor(){

    }
    ngOnInit(){

    }
    save(contactUsForm: NgForm){
        console.log(contactUsForm.form);
        console.log('Saved: ' + JSON.stringify(contactUsForm.value));
    }
}
