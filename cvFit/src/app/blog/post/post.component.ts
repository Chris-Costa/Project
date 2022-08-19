import { Component } from "@angular/core";
import { AuthService } from "src/app/form/auth.service";
import { BlogService } from "../blog.service";
import { IBlogPost } from "../blogPost";

@Component({
    selector: 'app-contactUs',
    templateUrl: './post.component.html'
})
export class PostComponent {
    constructor(private blogService: BlogService, public auth: AuthService){}
    title: string = '';
    author: string = this.auth.currentUser.firstName;
    post: string = '';

  

    blog(formValues: string){
        console.log(formValues)
    }
}