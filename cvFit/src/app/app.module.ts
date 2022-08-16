import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';


import { AppComponent } from './app.component';
import { ExerciseListComponent } from './exercises/exercise-list.component';
import { ExerciseDetailComponent } from './exercises/exercise-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { ContactUsComponent } from './form/contactUs.component';
import { LoginComponent } from './form/login.component';
import { ProfileComponent } from './form/profile.component';
import { BlogComponent } from './blog/blog.component';
import { WorkoutListComponent } from './exercises/workoutList/workoutList.component';
import { PostComponent } from './blog/post/post.component';
import { DiscussionComponent } from './blog/discussion/discussion.component';

import { AuthService } from './form/auth.service';
import { TransferService } from './exercises/workoutList/dataTransfer.service';

@NgModule({
  declarations: [
    AppComponent,
    ExerciseListComponent,
    ExerciseDetailComponent,
    ContactUsComponent,
    WelcomeComponent,
    LoginComponent,
    ProfileComponent,
    BlogComponent,
    WorkoutListComponent,
    PostComponent,
    DiscussionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatCardModule,
    MatMenuModule,
    MatRadioModule,
    MatCheckboxModule,
    MatListModule,
    RouterModule.forRoot([
      {path: 'exercises', component: ExerciseListComponent},
      {path: 'exercises/:id', component: ExerciseDetailComponent},
      {path: 'welcome', component: WelcomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'contact-us', component: ContactUsComponent},
      {path: 'blog', component: BlogComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'workoutlist', component: WorkoutListComponent},
      {path: 'discussion/:id', component: DiscussionComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    TransferService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
