import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from '@angular/router';
import { catchError, EMPTY } from "rxjs";
import { BlogService } from "../blog.service";
import { IComment } from "../../shared/blogPost";

@Component({
    selector: 'app-discussion',
    templateUrl: './discussion.component.html',
    styleUrls: ['./discussion.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscussionComponent{
    constructor(private router: Router, private blogService: BlogService) { }

    errorMessage=' ';
    comment: string = "";
    user: string = ""; //update with azure profile
    showForm: boolean = false;
    newComment: IComment = {user: "", reply: ""}; 

    selectedPost$ = this.blogService.selectedBlogPost$
        .pipe(
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            })
    );
    currentComments$ = this.blogService.commentsWithAdd$
        .pipe(
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            })
    );

    addNewComment(): void {  
        this.newComment.user = this.user;
        this.newComment.reply = this.comment;
        console.log('newBlogPost', this.newComment);
        this.blogService.addComment(this.newComment);
        this.newComment = {user: "", reply: ""};   
        this.showForm = false;
    }
    togglePostForm(): void{
        this.showForm = !this.showForm;
    }
    onBack(): void {
        this.router.navigate(['/blog']);
    } 
}