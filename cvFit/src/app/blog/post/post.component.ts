import { Component } from "@angular/core";
import { BlogService } from "../blog.service";
import { IBlogPost } from "../../shared/blogPost";

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
    newBlogPost: IBlogPost = {blogId: this.id, blogTitle: "", blogAuthor: "", blogContent: "", authorAvatar: "", liked: 1, comments: []}; 
    
    addNewBlogPost(): void {  
        this.newBlogPost.blogTitle = this.title;
        this.newBlogPost.blogContent = this.post;
        console.log('newBlogPost', this.newBlogPost);
        this.blogService.addBlogPost(this.newBlogPost);
        this.newBlogPost = {blogId: this.id++, blogTitle: "", blogAuthor: this.author, blogContent: "", authorAvatar: "", liked: 1, comments: []};   
    }
    blog(formValues: string){
        console.log(formValues)
    }
}