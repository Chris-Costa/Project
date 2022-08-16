import { Component, OnInit } from "@angular/core";
import { BlogService } from "./blog.service";
import { IBlogPost } from "./blogPost";
import { MatDialog } from '@angular/material/dialog';
import { PostComponent } from "./post/post.component";


@Component({
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {
  constructor (private blogService: BlogService, private dialog: MatDialog){ }

    showForm: boolean = false;
    title: string;
    author: string;
    post: string;

    togglePostForm(): void{
        this.showForm = !this.showForm;
    }
    blog(formValues){
       this.blogService.savePost(formValues);
       console.log(formValues);
    }

    blogPosts: IBlogPost[] = [];
    errorMessage: string;

    //automatically grab all discussion board posts and populate with ngOnInit
    ngOnInit(): void{
        this.blogService.getBlogPosts().subscribe({
            next: blogPosts => {
                this.blogPosts = blogPosts;
            },
            error: err => this.errorMessage = err
        }); 
    }
  
    openDialog() {
        this.dialog.open(PostComponent, {
          width: '500px',
        });
    }

    arr: number[] = []
    disableLikedPostsButton: boolean = false
    //hold liked blog posts
    filteredList: IBlogPost[] = [
        {
            blogId: 3,
            blogTitle: "Best form of cardio?",
            blogAuthor: "Mike Glennon",
            blogContent: "What type of cardio do people prefer.  Looking to lose weight fast and have a good sweat.",
            authorAvatar: "./assets/images/head2.png",
            likes: 16,
            comments: 3
        }
    ]
    //flag for liked or all post
    allFlag: boolean = true;
    allPosts(){
        this.allFlag = true;
    }
    likedPosts(){
        this.allFlag = false;
    }
    liked(title: string, author: string, content: string, num: number, ava: string){
        this.filteredList.push({blogId: 4, blogTitle: title, blogAuthor: author, blogContent: content, authorAvatar: ava, likes: undefined, comments: num});
        console.log(`Ids of liked discussions ${this.arr}`)
        this.disableLikedPostsButton = false;
    }
    
    trash(){
        this.filteredList.pop();
        if (this.filteredList.length == 0){
            console.log("empty");
            this.allPosts();
            this.disableLikedPostsButton = true;
        }
    }
} 