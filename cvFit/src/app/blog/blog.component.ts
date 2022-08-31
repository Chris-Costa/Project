import { Component } from "@angular/core";
import { BlogService } from "./blog.service";
import { IBlogPost } from "./blogPost";
import { MatDialog } from '@angular/material/dialog';
import { PostComponent } from "./post/post.component";
import { AuthService } from "../form/auth.service";
import { catchError, EMPTY, map } from "rxjs";

@Component({
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})

//if current user and id of blog is == to an id of exisiting blog post add it to new filtered array
export class BlogComponent {

    constructor (public blogService: BlogService, private dialog: MatDialog, public auth: AuthService){ }

    title: string;
    author: string;
    post: string;
    likedPosts: IBlogPost[] = [];
    errorMessage: string;
    allFlag: boolean = true;

    blogPosts$ = this.blogService.blogPosts$
        .pipe(
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            })
        );
    //filter if blog id and user id meet the requirments
    tempHardCodeLike: number = 1;
    filteredBlogPosts$ = this.blogService.blogPosts$
        .pipe(
            map(posts => posts.filter(item => item.blogId === this.blogService.likedPostList[this.auth.currentUser.id].postIds[this.tempHardCodeLike]))
        );

    //for selected id value
    onSelected(postId: number): void{
        this.blogService.selectedPostChange(postId);
    }
    /*
    //temp hard coded selector for like posts
    selectedState = 1;
    blogPostsFiltered$ = this.blogService.blogPosts$
    .pipe(
        map(items => items.filter(item => item.blogId === this.selectedState))
        
    );
   */
    allPosts(){
        this.allFlag = true;
    }
    likedP(){
        this.allFlag = false;
    }
    //start of create new post form functions
    openDialog() {
        this.dialog.open(PostComponent, {
          width: '500px',
        });
    }
    blog(formValues){
       this.blogService.savePost(formValues);
       console.log(formValues);
    }
    //end of create new post form functions
    liked(postId : number, userId: number){
        this.blogService.likedPostList[userId].postIds.push(postId)
        //this.blogService.likedPostList.push({userId: userId, postId: postId})
    }
    removeLikedPost(id: number){
        this.blogService.remove(id);
    }
} 