import { Component } from "@angular/core";

@Component({
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent{

    blogTitle: string = 'Good apps for tracking macros??';
    blogAuthor: string = 'Tommy Hamilton';
    blogPost: string = 'Does anyone have suggestions for apps to track my macro intakes.  Why do you recommend?';
    showForm: boolean = false;
    title: any;
    author: any;
    post: any;
    


    togglePostForm(): void{
        this.showForm = !this.showForm;
    }
    blog(formValues: any){
        console.log(formValues)
    }

}