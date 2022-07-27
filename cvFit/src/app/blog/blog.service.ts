import { Injectable } from "@angular/core";
import { IBlogPost } from "./blogPost";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class BlogService{
    private blogUrl = 'assets/json/blogs.json';
    constructor (private http: HttpClient) { }

    getBlogPosts(): Observable<IBlogPost[]>{
        return this.http.get<IBlogPost[]>(this.blogUrl).pipe(
            tap(data => console.log('All: ', JSON.stringify(data))), 
            catchError(this.handleError)
        );
    }
    getBlogPost(id: number): Observable<IBlogPost | undefined> {
        return this.getBlogPosts()
          .pipe(
            map((products: IBlogPost[]) => products.find(p => p.blogId === id))
          );
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