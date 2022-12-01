import { Component } from "@angular/core";
import { BlogService } from "../blog.service";
import { IBlogPost } from "../../shared/blogPost";
import { Blog } from "src/app/shared/blog";
import { catchError, EMPTY } from "rxjs";


@Component({
    selector: 'app-contactUs',
    templateUrl: './post.component.html'
})
export class PostComponent {  //use this componet to add a new post to the exisiting blog posts stream
    constructor(private blogService: BlogService){}
    title: string = '';
    author: string = ''; //was being pulled from auth service needs to be updated for azure profile
    post: string = '';
    id: number = 4;
    newBlogPost: IBlogPost = {id: this.id, title: "", author: "", content: "", avatar: "", likes: 1, comment: []}; 
    errorMessage: string;
    success: boolean;
    //temp value until we set up user
    tempAvatar: string = './assets/images/ava2-modified.png';
    
    addNewBlogPost(): void {  
        this.newBlogPost.title = this.title;
        this.newBlogPost.content = this.post;
        console.log('newBlogPost', this.newBlogPost);
        this.blogService.addBlogPost(this.newBlogPost);
        this.newBlogPost = {id: this.id++, title: "", author: this.author, content: "", avatar: "", likes: 1, comment: []};   
    }
    blog(title: string, author: string, post: string){
        //console.log(formValues);
        let blog: Blog = {
            title: title, 
            author: author,
            content: post,
            avatar: this.tempAvatar
        };
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