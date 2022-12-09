import { Component } from "@angular/core";
import { BlogService } from "./blog.service";
import { BehaviorSubject, catchError, combineLatest, EMPTY, map } from "rxjs";
import { PostComponent } from "./post/post.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})

export class BlogComponent {
    constructor (private blogService: BlogService, private dialog: MatDialog){ }

    title: string;
    author: string;
    post: string;
    errorMessage: string;
    private filterSelectedSubject = new BehaviorSubject<number>(0);
    
    filterSelectedAction$ = this.filterSelectedSubject.asObservable();

    blogPosts$ = combineLatest([this.blogService.blogPostsWithAdd$, this.filterSelectedAction$])
        .pipe(
            map(([posts, filterSelected]) =>
            posts.filter(post =>
                filterSelected ? post.likes === filterSelected : true)
            ),
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            })
    );
   
    onSelected(postId: number): void{
        this.blogService.selectedPostChange(postId);
    }

    filterSelection(num: number): void {
        this.filterSelectedSubject.next(+num);
    }

    openDialog() { 
        this.dialog.open(PostComponent, {
            width: '500px',
        });
    }
} 