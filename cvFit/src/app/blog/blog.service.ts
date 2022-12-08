import { Injectable } from "@angular/core";
import { IBlogPost, IComment } from "../shared/blogPost";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, catchError, combineLatest, map, merge, Observable, scan, Subject, tap, throwError } from "rxjs";
import { PostComponent } from "./post/post.component";
import { MatDialog } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})

export class BlogService{
    constructor (private http: HttpClient, private dialog: MatDialog) { }

    private blogUrl = 'https://localhost:7018/blog/';
    private commentUrl = 'https://localhost:7018/Comment?blogId='
    disableLikedPostsButton: boolean = false //if liked posts array is empty disable button
    private postSelctionSubject = new BehaviorSubject<number>(0); //get a single selected blog post used in discussion component
    private blogPostInsertedSubject = new Subject<IBlogPost>();   //used to add new blogPost to list
    private commentInsertedSubject = new Subject<IComment>();

    blogPosts$ = this.http.get<IBlogPost[]>(this.blogUrl) //all blog posts
        .pipe(
            tap(data => console.log('Blog Posts', JSON.stringify(data))),
            catchError(this.handleError)
    );
    
    postSelectionAction$ = this.postSelctionSubject.asObservable();

    selectedBlogPost$ = combineLatest([this.blogPosts$, this.postSelectionAction$])
        .pipe(
            map(([posts, selectedPostId]) => 
                posts.find(post => post.id === selectedPostId)),
            tap(post => console.log('selected post', post))
    );

    blogPostInsertedAction$ = this.blogPostInsertedSubject.asObservable();
    
    blogPostsWithAdd$ = merge(this.blogPosts$, this.blogPostInsertedAction$)  //combine exisitng stream with new workout
        .pipe(
            scan((acc, value) =>
            (value instanceof Array) ? [...value] : [...acc, value], [] as IBlogPost[])
    );
    
    commentInsertedAction$ = this.commentInsertedSubject.asObservable();
    
    commentsOfCurrentPost$ = this.selectedBlogPost$ //observable of the currently selected posts comments
        .pipe(
            map(post => post.comment),
            tap(data => console.log('comments', JSON.stringify(data))),
            catchError(this.handleError)
    );

    commentsWithAdd$ = merge(this.commentsOfCurrentPost$, this.commentInsertedAction$)
        .pipe(
            scan((acc, value) =>
            (value instanceof Array) ? [...value]: [...acc, value], [] as IComment[])
    );

    selectedPostChange(selectedPostId: number): void{ //take in value that user selects
        this.postSelctionSubject.next(selectedPostId);
        console.log('This is the id', this.postSelctionSubject.value);
    }
    addBlogPost(newPost: IBlogPost) { //function to add new workout in component
        this.blogPostInsertedSubject.next(newPost)
    }
    addComment(newComment: IComment) {
        this.commentInsertedSubject.next(newComment);
    }
    openPostDialog(){
        this.dialog.open(PostComponent, {
            width: '500px',
          });
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

    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    postBlog(message: IBlogPost): Observable<IBlogPost | Number> {
        return this.http.post<IBlogPost | Number>(this.blogUrl, message, this.httpOptions);
    } 
    postComment(message: IComment): Observable<IComment | Number> {
        return this.http.post<IComment | Number>(this.commentUrl + this.postSelctionSubject.value, message, this.httpOptions);
    } 
}