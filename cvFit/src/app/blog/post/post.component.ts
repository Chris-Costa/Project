import { Component, OnInit } from "@angular/core";
import { BlogService } from "../blog.service";
import { IBlogPost } from "../../shared/blogPost";
import { catchError, EMPTY, take } from "rxjs";
import { HttpClient } from "@angular/common/http";

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string
};
@Component({
    selector: 'app-contactUs',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit { 
    constructor(private blogService: BlogService, private http: HttpClient) { }

    profile!: ProfileType;
    title: string = '';
    author: string = '';
    post: string = '';
    avatar: string= '';
    category: number = 0;  //default no category selected 

    errorMessage: string;
    success: boolean;

    ngOnInit() {
        this.getProfile();
    }
    
    getProfile() {
        this.http.get(GRAPH_ENDPOINT)
            .pipe(take(1)).subscribe(profile => {
                this.profile = profile;
        });
    }
    
    blog(title: string, post: string, avatar: string){
        
        if(avatar == './assets/images/ava1-modified.png'){
            this.category = 1;
        }
        else if(avatar == './assets/images/ava2-modified.png'){
            this.category = 2;
        }
        else if(avatar == './assets/images/ava3-modified.png'){
            this.category = 3;
        }
        else if(avatar == './assets/images/ava4-modified.png'){
            this.category = 4;
        }
        let blog: IBlogPost = {
            title: title, 
            author: this.profile.givenName,
            content: post,
            avatar: avatar,
            category: this.category
        };
        
        this.blogService.postBlog(blog)
            .pipe(take(1),
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            }))
            .subscribe(res => {
                this.blogService.refreshStream();
                if(res) {
                    this.success = true;
                }
            });
    }
}