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
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

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
import { CalculatorComponent } from './macroCalculator/calculator.component';
import { MacroTableComponent } from './macroCalculator/macro-table.component';
import { CalcService } from './macroCalculator/calculator.service';

import { MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser';
import { AppRoutingModule } from './app-routing.module';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

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
    DiscussionComponent,
    CalculatorComponent,
    MacroTableComponent
  ],
  imports: [
    AppRoutingModule,
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: '6063621e-ae81-4c3e-b0ee-6c9486c01725', // Application (client) ID from the app registration
        authority: 'Enter_the_Cloud_Instance_Id_Here/55e374bf-374e-49de-a716-836ce6f714d1', // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
        redirectUri: 'http://localhost:4200'// This is your redirect URI
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      }
    }), null, null),
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
    MatIconModule,
    MatSelectModule,
    RouterModule.forRoot([
      {path: 'exercises', component: ExerciseListComponent},
      {path: 'exercises/:id', component: ExerciseDetailComponent},
      {path: 'welcome', component: WelcomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'contact-us', component: ContactUsComponent},
      {path: 'blog', component: BlogComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'calc', component: CalculatorComponent},
      {path: 'workoutlist', component: WorkoutListComponent},
      {path: 'discussion/:id', component: DiscussionComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    CalcService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
