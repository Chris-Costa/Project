import { Component, OnInit } from "@angular/core";
import { BlogService } from "./blog.service";
import { IBlogPost } from "./blogPost";
import { HttpClient } from "@angular/common/http";

@Component({
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
    showForm: boolean = false;
    //input fields for new post
    title: string;
    author: string;
    post: string;
    
    togglePostForm(): void{
        this.showForm = !this.showForm;
    }
   blog(formValues: string){
       console.log(formValues);
   }

    blogPosts: IBlogPost[] = [];
    errorMessage: string;

    constructor (private blogService: BlogService){ }

    //automatically grab all discussion board posts and populate with ngOnInit
    ngOnInit(): void{
        this.blogService.getBlogPosts().subscribe({
            next: blogPosts => {
                this.blogPosts = blogPosts;
            },
            error: err => this.errorMessage = err
        }); 
    }
    
    //delete functionality
    delBlogPost(){
        this.blogService.delBlogPosts().subscribe({
            next: blogPosts => {
                this.blogPosts = blogPosts;
            }, error: err => this.errorMessage = err
        });
    }
    
    incrementLikes(){

    }
    incrementComments(){
        
    }
}