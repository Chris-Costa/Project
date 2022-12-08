import { Component } from "@angular/core";
import { BlogService } from "../blog.service";
import { IBlogPost } from "../../shared/blogPost";
import { catchError, EMPTY } from "rxjs";


@Component({
    selector: 'app-contactUs',
    templateUrl: './post.component.html'
})
export class PostComponent { 
    constructor(private blogService: BlogService){}
    title: string = '';
    author: string = '';
    post: string = '';
    errorMessage: string;
    success: boolean;
    //temp value until we set up user
    tempAvatar: string = './assets/images/ava2-modified.png';
    
    
    blog(title: string, author: string, post: string){
        let blog: IBlogPost = {
            title: title, 
            author: author,
            content: post,
            avatar: this.tempAvatar
        };
        this.blogService.addBlogPost(blog);
        this.blogService.postBlog(blog)
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