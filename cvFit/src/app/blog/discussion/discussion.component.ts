import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { catchError, EMPTY } from "rxjs";
import { BlogService } from "../blog.service";
import { IComment } from "../../shared/blogPost";
import { HttpClient } from "@angular/common/http";

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string
};
@Component({
    selector: 'app-discussion',
    templateUrl: './discussion.component.html',
    styleUrls: ['./discussion.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscussionComponent implements OnInit {

    constructor(private blogService: BlogService, private http: HttpClient) { }

    profile!: ProfileType;
    showForm: boolean = false;
    success: boolean;
    errorMessage: string = '';
    comment: string = '';

    selectedPost$ = this.blogService.selectedBlogPost$
        .pipe(
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            })
    );
    
    currentComments$ = this.blogService.commentsWithAdd$
        .pipe(
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            })
    );

    ngOnInit() {
        this.getProfile();
    }
    
    getProfile() {
        this.http.get(GRAPH_ENDPOINT)
          .subscribe(profile => {
            this.profile = profile;
        });
    }

    addNewComment(): void {  
        let comment: IComment = {
            user: this.profile.givenName,
            reply: this.comment
        };
        this.blogService.addComment(comment);
        this.blogService.postComment(comment)
            .pipe(catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            }))
            .subscribe(res => {
                if(res) {
                    this.success = true;
                }
            });
    }

    togglePostForm(): void{
        this.showForm = !this.showForm;
    }
}