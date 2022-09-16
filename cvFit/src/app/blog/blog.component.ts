import { Component } from "@angular/core";
import { BlogService } from "./blog.service";
import { AuthService } from "../form/auth.service";
import { catchError, EMPTY, map } from "rxjs";

@Component({
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})

export class BlogComponent {

    constructor (public blogService: BlogService, public auth: AuthService){ }

    title: string;
    author: string;
    post: string;
    errorMessage: string;
    allFlag: boolean = true;
    

    blogPosts$ = this.blogService.blogPostsWithAdd$
        .pipe(
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            })
    );
   
    
    tempHardCodeLike: number = 1; //filter if blog id and user id meet the requirments
    filteredBlogPosts$ = this.blogService.blogPosts$
        .pipe(
            map(posts => posts.filter(post => ({
                ...post,
                blogId: post.blogId === this.blogService.likedPostList[this.auth.currentUser.id].postIds[this.tempHardCodeLike]})
            ))
    );


    
    //for selected id value
    onSelected(postId: number): void{
        this.blogService.selectedPostChange(postId);
    }
    
    allPosts(){
        this.allFlag = true;
    }
    likedP(){
        this.allFlag = false;
    }
    //start of create new post form functions
    openDialog() {
        this.blogService.openPostDialog();
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