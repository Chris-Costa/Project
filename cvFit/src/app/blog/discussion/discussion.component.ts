import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from "src/app/form/auth.service";
import { BlogService } from "../blog.service";
import { IBlogPost } from "../blogPost";

import { IDiscussion } from "./discussion";


@Component({
    selector: 'app-discussion',
    templateUrl: './discussion.component.html',
    styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent{
    constructor(private route: ActivatedRoute, private router: Router, private blogService: BlogService, public auth: AuthService) { }
    holdId: number;
    errorMessage=' ';
    blogPost: IBlogPost;
    comment: string = "";
    showForm: boolean = false;
    togglePostForm(): void{
        this.showForm = !this.showForm;
    }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (id) {
            this.getPost(id);
            this.holdId = id;
        }
    }
    //routing with code
    //go from detail expansion page back to exercise list
    onBack(): void {
        this.router.navigate(['/blog']);
    } 
    getPost(id: number): void {
        this.blogService.getBlogPost(id).subscribe({
          next: blogPost => this.blogPost = blogPost,
          error: err => this.errorMessage = err
        });
    }
    
    reply(formValues: string){
        this.comment = formValues;
    }
    createReply(){
        this.showForm = false;
        this.tempData.push({id: this.holdId, user: this.auth.currentUser.firstName, comments: this.comment})
        //increment comment number
        //this.blogPost[this.holdId].comments++;
    }
    tempData: IDiscussion[] = [
        {
            id: 1,
            user: "Jimmy",
            comments: "This is a great question Tom, Im wondering the same thing as I struggle to track my daily intakes with just pencil and paper"
        },
        {
            id: 1,
            user: "Kim",
            comments: "There is an app called MyFitnessPal that is free on the app store.  It has a decent UI and gives you everything you'll need to get started."
        },
        {
            id: 2,
            user: "Jeremy",
            comments: "You should focus and bending the bar towards your toes.  And engage you lat muscles, while keeping your sholders back"
        },
        {
            id: 3,
            user: "Jake",
            comments: "For me personally the best type of cardio is stairmaster.  Good sweat and works the calfs and quads"
        },
        {
            id: 3,
            user: "Shannon",
            comments: "I love the stationary bike.  Its easy to adjust the tension and there are plenty of places to find spin classes if you prefer the motivation of a group setting."
        },
        {
            id: 3,
            user: "Mike",
            comments: "I'd say walking on the treadmill can be best for calorie burning.  A slight incline and a constant speed for 10 to 15 minutes gives the same benefits as any other method"
        }
    ]
}