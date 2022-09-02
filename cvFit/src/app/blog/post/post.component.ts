import { Component } from "@angular/core";
import { AuthService } from "src/app/form/auth.service";

@Component({
    selector: 'app-contactUs',
    templateUrl: './post.component.html'
})
export class PostComponent {
    constructor(public auth: AuthService){}
    title: string = '';
    author: string = this.auth.currentUser.firstName;
    post: string = '';

    blog(formValues: string){
        console.log(formValues)
    }
}