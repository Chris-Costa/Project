import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
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
export class DiscussionComponent {
    constructor(private router: Router, private blogService: BlogService) { }

    
    errorMessage=' ';
    comment: string = "";
    //temp current user Update with azure profile
    user: string = "Temp User First and Last name"; //update with azure profile
    showForm: boolean = false;
    newComment: IComment = {user: "", reply: ""}; 
    success: boolean;

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
        let comment: IComment = {
            user: this.user, 
            reply: this.comment
        };
        this.blogService.addComment(comment);
        this.blogService.postComment(comment)
            .pipe(catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            }))
            .subscribe(res => {
                if(res) {
                    this.success = true;
                }
            });
        //this.newComment.user = this.user;
        //this.newComment.reply = this.comment;
        //console.log('newBlogPost', this.newComment);
        //this.blogService.addComment(this.newComment);
        //this.newComment = {user: "", reply: ""};   
        //this.showForm = false;
    }
    togglePostForm(): void{
        this.showForm = !this.showForm;
    }
    onBack(): void {
        this.router.navigate(['/blog']);
    } 
}