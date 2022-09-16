import { Injectable } from "@angular/core";
import { IBlogPost, ILikedPosts } from "./blogPost";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, combineLatest, map, merge, scan, Subject, tap, throwError } from "rxjs";
import { AuthService } from "../form/auth.service";
import { PostComponent } from "./post/post.component";
import { MatDialog } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})

export class BlogService{
    constructor (private http: HttpClient, private auth: AuthService, private dialog: MatDialog) { }

    private blogUrl = 'assets/json/blogs.json';
    disableLikedPostsButton: boolean = false //if liked posts array is empty disable button
    private blogPostInsertedSubject = new Subject<IBlogPost>();   //used to add new blogPost to list
    private postSelctionSubject = new BehaviorSubject<number>(0); //get a single selected blog post used in discussion component

    blogPosts$ = this.http.get<IBlogPost[]>(this.blogUrl) //all blog posts
        .pipe(
            tap(data => console.log('Blog Posts', JSON.stringify(data))),
            catchError(this.handleError)
    );
    
    blogPostInsertedAction$ = this.blogPostInsertedSubject.asObservable();
    
    blogPostsWithAdd$ = merge(this.blogPosts$, this.blogPostInsertedAction$)  //combine exisitng stream with new workout
        .pipe(
            scan((acc, value) =>
            (value instanceof Array) ? [...value] : [...acc, value], [] as IBlogPost[])
    );
    
    postSelectionAction$ = this.postSelctionSubject.asObservable();

    selectedBlogPost$ = combineLatest([this.blogPosts$, this.postSelectionAction$])
        .pipe(
            map(([posts, selectedPostId]) => 
                posts.find(post => post.blogId === selectedPostId)),
            tap(post => console.log('selected post', post))
    );

    addBlogPost(newPost: IBlogPost) { //function to add new workout in component
        this.blogPostInsertedSubject.next(newPost)
    }
    selectedPostChange(selectedPostId: number): void{ //take in value that user selects
        this.postSelctionSubject.next(selectedPostId);
    }
    openPostDialog(){
        this.dialog.open(PostComponent, {
            width: '500px',
          });
    }
    /*//for likes
    blogPostsLikes$ = this.http.get<IBlogPost[]>(this.)
        .pipe(
            map(posts =>
                posts.map(post => ({
                    ...post,
                    likes: post.likes + 1} as IBlogPost)
                )
            )
    );*/
    //get a single selected blog post used in discussion component
    
    
    





    //hold liked blog posts
    likedPostList: ILikedPosts[] = [
        {
            userId: 0,
            postIds: []
        },
        {
            userId: 1,
            postIds: [1, 3]
        },
        {
            userId: 2,
            postIds: [2, 3]
        }
    ]
    savePost(create){
        //post to json 

    }
  
    //trash function
    remove(id: number){
        this.likedPostList[this.auth.currentUser.id].postIds.splice(id, 1);
        /*for (let x = 0; x < this.likedPostList.length; x++){
            if (this.likedPostList[x].postId == id && this.auth.currentUser.id == this.likedPostList[x].userId){
                this.likedPostList.splice(x, 1);
            }
        }*/
        if (this.likedPostList.length == 0){
            this.disableLikedPostsButton = true;
        }
    }

    like(postId: number, userId: number){
        //this.likedPostList.push({userId: userId, postId: postId});
        this.likedPostList[userId].postIds.push(postId);
        this.disableLikedPostsButton = false;
    }
    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if (err.error instanceof ErrorEvent){
            errorMessage = `An error occured ${err.error.message}`;
        }
        else 
            errorMessage = `Server returned code:` 
            
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}