import { Injectable } from "@angular/core";
import { IBlogPost, ILikedPosts } from "./blogPost";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, combineLatest, map, Observable, tap, throwError } from "rxjs";
import { AuthService } from "../form/auth.service";

@Injectable({
    providedIn: 'root'
})

export class BlogService{
    constructor (private http: HttpClient, private auth: AuthService) { }

    private blogUrl = 'assets/json/blogs.json';
    status: string;
    
    //if liked posts array is empty disable button
    disableLikedPostsButton: boolean = false

    blogPosts$ = this.http.get<IBlogPost[]>(this.blogUrl)
        .pipe(
            map(posts => 
                posts.map(post => ({
                    ...post
                } as IBlogPost))),
            tap(data => console.log('All: ', JSON.stringify(data))), 
            catchError(this.handleError)
        );

    private productSelctionSubject = new BehaviorSubject<number>(0);
    postSelectionAction$ = this.productSelctionSubject.asObservable();
    //code to get a single selected blog post used in discussion component
    selectedBlogPost$ = combineLatest([
        this.blogPosts$, this.postSelectionAction$
        ]).pipe(
            map(([posts, selectedPostId]) => 
            posts.find(post => post.blogId === selectedPostId)),
            tap(post => console.log('selected post', post))
        );
    
    //take in value that user selects
    selectedPostChange(selectedPostId: number): void{
        this.productSelctionSubject.next(selectedPostId);
    }
    
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
    getBlogPost(id: number): Observable<IBlogPost | undefined> {
        return this.blogPosts$
          .pipe(map((products: IBlogPost[]) => products.find(p => p.blogId === id)));
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