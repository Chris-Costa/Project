import { Component } from "@angular/core";
import { BlogService } from "./blog.service";
import { catchError, EMPTY } from "rxjs";

@Component({
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})

export class BlogComponent {
    constructor (private blogService: BlogService){ }

    title: string;
    author: string;
    post: string;
    errorMessage: string;
    
    blogPosts$ = this.blogService.blogPostsWithAdd$
        .pipe(
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            })
    );
   
    onSelected(postId: number): void{ //for selected id value
        this.blogService.selectedPostChange(postId);
    }
    openDialog() { //start of create new post form functions
        this.blogService.openPostDialog();
    }
} 