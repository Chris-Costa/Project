import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from '@angular/router';
import { catchError, EMPTY } from "rxjs";
import { AuthService } from "src/app/form/auth.service";
import { BlogService } from "../blog.service";

@Component({
    selector: 'app-discussion',
    templateUrl: './discussion.component.html',
    styleUrls: ['./discussion.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscussionComponent{
    constructor(private router: Router, private blogService: BlogService, public auth: AuthService) { }

    errorMessage=' ';
    comment: string = "";
    showForm: boolean = false;

    selectedPost$ = this.blogService.selectedBlogPost$
        .pipe(
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            })
        );
   
    togglePostForm(): void{
        this.showForm = !this.showForm;
    }
    onBack(): void {
        this.router.navigate(['/blog']);
    } 
    reply(formValues: string){
        this.comment = formValues;
    }
    createReply(){
        this.showForm = false;
        //this.blogService.push({id: 1, user: this.auth.currentUser.firstName, comments: this.comment})
    }
}