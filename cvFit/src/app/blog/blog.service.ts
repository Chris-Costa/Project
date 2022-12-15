import { Injectable } from "@angular/core";
import { IBlogPost, IComment } from "../shared/blogPost";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, catchError, combineLatest, map, merge, Observable, scan, Subject, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class BlogService{
    constructor (private http: HttpClient) { }

    private blogUrl = 'https://localhost:7018/blog/';
    private commentUrl = 'https://localhost:7018/Comment?blogId='
    private postSelctionSubject = new BehaviorSubject<number>(0); //get a single selected blog post used in discussion component
    private blogPostInsertedSubject = new Subject<IBlogPost>();   //used to add new blogPost to list
    private commentInsertedSubject = new Subject<IComment>();
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    blogPosts$ = this.http.get<IBlogPost[]>(this.blogUrl) 
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
    
    blogPostsWithAdd$ = merge(this.blogPosts$, this.blogPostInsertedAction$)  
        .pipe(
            scan((acc, value) =>
            (value instanceof Array) ? [...value] : [...acc, value], [] as IBlogPost[])
    );
    
    commentInsertedAction$ = this.commentInsertedSubject.asObservable();
    
    commentsOfCurrentPost$ = this.selectedBlogPost$ 
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

    selectedPostChange(selectedPostId: number): void{ 
        this.postSelctionSubject.next(selectedPostId);
        console.log('selected post id ', this.postSelctionSubject.value);
    }

    postBlog(newPost: IBlogPost): Observable<IBlogPost | Number> {
        this.blogPostInsertedSubject.next(newPost)
        return this.http.post<IBlogPost | Number>(this.blogUrl, newPost, this.httpOptions);
    } 

    postComment(newComment: IComment): Observable<IComment | Number> {
        this.commentInsertedSubject.next(newComment);
        return this.http.post<IComment | Number>(this.commentUrl + this.postSelctionSubject.value, newComment, this.httpOptions);
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