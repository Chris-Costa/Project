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
    newBlogPost: IBlogPost = {id: this.id, title: "", author: "", content: "", avatar: "", likes: 1, comment: []}; 
    
    addNewBlogPost(): void {  
        this.newBlogPost.title = this.title;
        this.newBlogPost.content = this.post;
        console.log('newBlogPost', this.newBlogPost);
        this.blogService.addBlogPost(this.newBlogPost);
        this.newBlogPost = {id: this.id++, title: "", author: this.author, content: "", avatar: "", likes: 1, comment: []};   
    }
    blog(formValues: string){
        console.log(formValues)
    }
}